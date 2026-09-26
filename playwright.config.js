const { defineConfig, devices } = require('@playwright/test');

// Serve the repo root so the site lives under /src/, mirroring the GitHub Pages project subpath
module.exports = defineConfig({
  testDir: 'tests',
  use: {
    baseURL: 'http://localhost:4173/src/',
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: 'python3 -m http.server 4173 --bind 127.0.0.1',
    url: 'http://localhost:4173/src/',
    reuseExistingServer: true,
    stderr: 'ignore',
  },
});
