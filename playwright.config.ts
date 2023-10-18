import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  // workers: 3,
  // /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI  ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
      {
        slackWebHookUrl: "<slack web token",
        sendResults: "off", // "always" , "on-failure", "off",
        meta: [
          {
            key: 'Suite', 
            value: 'Automation',
          },
          {
              key: 'HTML Results',
              value: '<https://your-build-artifacts.my.company.dev/pw/23887/playwright-report/index.html|📊>',
          },
      ],
        disableUnfurl: true,
        showInThread: true,
      },
    ],
    ['dot'] // other reporters
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    storageState: '',
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
      launchOptions: {
        args: ["--start-fullscreen"], // starting the browser in full screen
        slowMo: 1000
        },
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox']
      , 
      launchOptions: {
        args: ["--start-fullscreen"], // starting the browser in full screen
        slowMo: 1000
        },
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], 
      launchOptions: {
        args: ["--start-fullscreen"], // starting the browser in full screen
        slowMo: 1000
        },
       },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  
  }
);
