import {defineConfig, devices} from '@playwright/test';
import * as TEST_CONST from './__tests__/testConstants';

export default defineConfig({
  testDir: './__tests__',
  preserveOutput: 'never',
  outputDir: undefined,
  webServer: {
    command: 'yarn web',
    url: TEST_CONST.LOCAL_URL,
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
