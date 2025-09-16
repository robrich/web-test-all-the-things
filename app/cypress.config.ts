import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/e2e/specs/**/*.ts',
    supportFile: 'tests/e2e/support/index.ts',
    fixturesFolder: 'tests/e2e/fixtures',
    screenshotsFolder: 'results/screenshots',
    videosFolder: 'results/videos'
  },
  video: true,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/app-cypress-[hash].xml'
  }
});
