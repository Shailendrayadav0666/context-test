import { defineConfig, devices } from '@playwright/test';

// Workspace-root Playwright project (playwright-automation.md Step -1). The app under test is the
// StreamPlex frontend (src/frontend, Vite dev server on 5173, /api proxied to 8000) backed by the
// FastAPI backend (src/backend). Both are started from the projects' own run commands
// (src/frontend/README.md "Running locally"); an already-running server is reused.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'python -m uvicorn main:app --port 8000',
      cwd: 'src/backend',
      url: 'http://localhost:8000/docs',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'npm run dev -- --port 5173 --strictPort',
      cwd: 'src/frontend',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
