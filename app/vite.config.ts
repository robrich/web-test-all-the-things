import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';


const junitFile = process.env.VITEST_JUNIT_FILE || 'results/vitest.xml';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unit/**/*.ts', 'tests/api/**/*.ts'],
    reporters: [
      'default',
      ['junit', { outputFile: junitFile }]
    ]
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../api/dist/public',
    emptyOutDir: true
  }
});
