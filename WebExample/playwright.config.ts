import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  preserveOutput: 'never',
  webServer: {
    command: 'yarn web',
    url: 'http://localhost:19006',
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
  projects: [
    {
      name: 'Chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'Firefox',
      use: {...devices['Desktop Firefox']},
    },
    {
      name: 'Webkit',
      use: {...devices['Desktop Safari']},
    },
  ],
});
