(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // ---- Glyph swap gate ----
  // The Y->I swap translates by the two glyphs' measured advance widths, so it must not run against a fallback font
  document.fonts.ready.then(() => {
    if (document.fonts.check('600 1em "Space Grotesk"')) {
      document.documentElement.classList.add('fonts-ready');
    }
  });

  // ---- Scroll reveal ----
  const heroTargets = document.querySelectorAll('.hero .reveal, .hero .reveal-line');
  const revealTargets = document.querySelectorAll(
    ':is(.reveal, .reveal-line):not(.hero *)'
  );

  // Hero is the first view: play its entrance on load rather than waiting for intersection
  requestAnimationFrame(() =>
    requestAnimationFrame(() => heroTargets.forEach((el) => el.classList.add('is-visible')))
  );

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target.matches('.line-mask')
              ? entry.target.querySelector('.reveal-line')
              : entry.target;
            el.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    // A .reveal-line starts fully clipped by its .line-mask, so it can never intersect: observe the mask instead
    revealTargets.forEach((el) => observer.observe(el.closest('.line-mask') ?? el));
  }

  // ---- Nav hide on scroll down, show on scroll up ----
  const nav = document.querySelector('[data-nav]');
  const progressBar = document.querySelector('.progress-bar');

  if (nav) {
    let lastY = window.scrollY;

    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY;

        if (y > lastY && y > 120) {
          nav.classList.add('nav--hidden');
        } else {
          nav.classList.remove('nav--hidden');
        }
        lastY = y;

        if (progressBar) {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? y / docHeight : 0;
          progressBar.style.transform = `scaleX(${progress})`;
        }
      },
      { passive: true }
    );
  }

  // ---- Counters ----
  const counters = document.querySelectorAll('[data-counter]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    if (reduceMotion) {
      el.textContent = target;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => animateCounter(el));
  }

  // ---- Introspect: focus-for-details dialogs ----
  const dialog = document.querySelector('[data-introspect-dialog]');

  if (dialog) {
    const panel = dialog.querySelector('.introspect__panel');
    const dialogBody = dialog.querySelector('[data-introspect-body]');
    const route = dialog.querySelector('[data-introspect-route]');
    const templateFor = (id) => document.querySelector(`template[data-entity="${CSS.escape(id)}"]`);

    let lastTrigger = null;
    let settle = null;

    // A trigger with no matching <template> is not a trigger: strip it back to inert markup
    const degrade = (el) => {
      if (el.classList.contains('card-trigger')) {
        el.remove();
        return;
      }
      const span = document.createElement('span');
      span.className = el.className.replace(/\bentity\b/g, '').trim();
      span.innerHTML = el.innerHTML;
      el.replaceWith(span);
    };

    const open = (trigger) => {
      const id = trigger.dataset.introspect;
      const tpl = templateFor(id);
      if (!tpl || dialog.open) return;

      lastTrigger = trigger;
      route.textContent = `entity/${id}`;
      dialogBody.replaceChildren(tpl.content.cloneNode(true));

      const title = dialogBody.querySelector('.introspect__title');
      if (title) title.id = 'introspect-title';
      Array.from(dialogBody.children).forEach((child, i) => child.style.setProperty('--i', i));

      dialogBody.scrollTop = 0;
      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();

      // The panel only has a box once it is in the top layer: grow it out of the word that was clicked
      const t = trigger.getBoundingClientRect();
      const p = panel.getBoundingClientRect();
      panel.style.transformOrigin = `${t.left + t.width / 2 - p.left}px ${t.top + t.height / 2 - p.top}px`;

      requestAnimationFrame(() => dialog.classList.add('is-open'));
    };

    const close = () => {
      if (!dialog.open || settle) return;
      dialog.classList.remove('is-open');

      const finish = () => {
        clearTimeout(settle);
        panel.removeEventListener('transitionend', onEnd);
        settle = null;
        dialog.close();
        dialogBody.replaceChildren();
        document.documentElement.style.overflow = '';
        lastTrigger?.focus({ preventScroll: true });
      };

      function onEnd(e) {
        if (e.target === panel && e.propertyName === 'opacity') finish();
      }

      if (reduceMotion) {
        finish();
        return;
      }

      panel.addEventListener('transitionend', onEnd);
      settle = setTimeout(finish, 700);
    };

    const live = [];

    document.querySelectorAll('[data-introspect]').forEach((el) => {
      if (!templateFor(el.dataset.introspect)) {
        degrade(el);
        return;
      }
      el.addEventListener('click', () => open(el));
      live.push(el);
    });

    // Arrival scan: a resting colour is easy to miss, a one-shot flash is not.
    // Triggers light up in sequence within their own section, once, as it comes into view.
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const order = new Map();
      live.forEach((el) => {
        const section = el.closest('section') ?? document.body;
        const i = order.get(section) ?? 0;
        el.style.setProperty('--s', i % 8);
        order.set(section, i + 1);
      });

      const scan = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-lit');
            scan.unobserve(entry.target);
          });
        },
        { threshold: 0.6 }
      );
      live.forEach((el) => scan.observe(el));
    }

    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      close();
    });
    dialog.addEventListener('click', (e) => {
      if (!panel.contains(e.target)) close();
    });
    dialog.querySelector('[data-introspect-close]').addEventListener('click', close);
  }

  // ---- Custom cursor dot (fine pointers, motion allowed) ----
  const cursor = document.querySelector('.cursor-dot');
  const canUseCursor =
    cursor &&
    !reduceMotion &&
    window.matchMedia('(pointer: fine)').matches;

  if (canUseCursor) {
    let hovering = false;

    const paint = (x, y) => {
      const scale = hovering ? ' scale(2.5)' : '';
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)${scale}`;
    };

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    window.addEventListener(
      'pointermove',
      (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
        paint(lastX, lastY);
      },
      { passive: true }
    );

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        hovering = true;
        paint(lastX, lastY);
      });
      el.addEventListener('mouseleave', () => {
        hovering = false;
        paint(lastX, lastY);
      });
    });
  }
})();
