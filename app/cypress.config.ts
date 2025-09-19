import { defineConfig } from 'cypress';
import { resolve } from 'path';


export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/e2e/specs/**/*.ts',
    supportFile: 'tests/e2e/support/index.ts',
    fixturesFolder: 'tests/e2e/fixtures',
    screenshotsFolder: 'results/screenshots',
    videosFolder: 'results/videos',
  },

  component: {
    specPattern: 'tests/component/specs/**/*.ts',
    supportFile: 'tests/component/support/component.ts',
    fixturesFolder: 'tests/component/fixtures',
    screenshotsFolder: 'results/screenshots',
    videosFolder: 'results/videos',
    indexHtmlFile: resolve(__dirname, 'tests/component/support/component-index.html'),
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  },

  video: true,
  reporter: 'junit',

  reporterOptions: {
    mochaFile: 'results/app-cypress-[hash].xml',
  }
});
