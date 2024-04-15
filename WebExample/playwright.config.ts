import {defineConfig} from '@playwright/test';

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
});
