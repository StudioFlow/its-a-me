(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
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
