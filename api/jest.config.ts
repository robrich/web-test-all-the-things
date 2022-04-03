import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testURL: 'http://localhost:3000/',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testMatch: ['<rootDir>/tests/**/*.ts'],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
      tsconfig: 'tsconfig.jest.json'
    }
  },
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'results',
      uniqueOutputName: 'true'
    }]
  ],
  setupFiles: [
    '<rootDir>config.ts'
  ]
} as Config.InitialOptions;

export default config;
