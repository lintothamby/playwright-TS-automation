import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 120000,
  retries: 1,
  use: {
    headless: true,
    screenshot: 'on',
    video: 'on',
    baseURL: 'https://automationintesting.online/',
  },
  reporter: [['line'], ['allure-playwright']],
  projects: [
    {
      name: 'Chromium', // Name of the project
      use: {
        browserName: 'chromium', // Run tests in Chromium
        headless: true,
        //screenshot: 'on',
        screenshot: "only-on-failure",
        video: 'on',
      },
    },
    {
      name: 'Firefox', // Name of the project
      use: {
        browserName: 'firefox', // Run tests in Firefox
        headless: true,
        //screenshot: 'on',
        screenshot: "only-on-failure",
        video: 'on',
      },
    },
    {
      name: 'Webkit', // Name of the project
      use: {
        browserName: 'webkit', // Run tests in WebKit
        headless: true,
        //screenshot: 'on',
        screenshot: "only-on-failure",
        video: 'on',
      },
    },
  ],
});
