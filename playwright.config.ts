import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";
import { parseBooleanValue } from "./src/lib/data";

config(); // loads the .env file

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
  testDir: "./tests", // Location to find tests.
  testMatch: "**/*.spec.ts",
  outputDir: "results", // Location reports are saved too.
  fullyParallel: false, // Tests inside of spec files are not to be run in parallel.
  forbidOnly: !!process.env.CI, // Fail the build on CI if you accidentally left test.only in the source code.
  retries: process.env.CI ? 2 : 0, // Retry on CI only
  workers: process.env.CI ? 1 : undefined, // Opt out of parallel tests on CI.
  reporter: "html", // Reporter to use. See https://playwright.dev/docs/test-reporters/
  // Used by all tests
  use: {
      baseURL: process.env.BASE_URL,
      testIdAttribute: "id",
      trace: "retain-on-failure", // See https://playwright.dev/docs/trace-viewer
      screenshot: "only-on-failure",
      video: "retain-on-failure",
      headless: parseBooleanValue(process.env.HEADLESS)
  },

  // Configure projects for major browsers
  projects: [
      {
          name: "setup",
          testMatch: "**/*.setup.ts"
      },
      {
          name: "chromium",
          use: { ...devices["Desktop Chrome"] },
          dependencies: ["setup"]
      }
      //{
      //    name: "firefox",
      //    use: { ...devices["Desktop Firefox"] },
      //    dependencies: ["setup"]
      //},
      //{
      //    name: "webkit",
      //    use: { ...devices["Desktop Safari"] },
      //    dependencies: ["setup"]
      //}
      // /* Test against mobile viewports. */
      // {
      //     name: "Mobile Chrome",
      //     use: { ...devices["Pixel 5"] },
      //     dependencies: ["setup"]
      // },
      // {
      //     name: "Mobile Safari",
      //     use: { ...devices["iPhone 12"] },
      //     dependencies: ["setup"]
      // },
      // /* Test against branded browsers. */
      // {
      //     name: "Microsoft Edge",
      //     use: { ...devices["Desktop Edge"], channel: "msedge" },
      //     dependencies: ["setup"]
      // },
      // {
      //     name: "Google Chrome",
      //     use: { ...devices["Desktop Chrome"], channel: "chrome" },
      //     dependencies: ["setup"]
      // }
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {

  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
