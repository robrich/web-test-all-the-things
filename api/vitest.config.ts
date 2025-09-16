import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      'tests/**/*.ts',
    ],
    globals: true,
    environment: 'node',
    reporters: [
      'default',
      ['junit', { outputFile: 'results/api-junit.xml' }]
    ]
  },
});
