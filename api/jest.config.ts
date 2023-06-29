import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironmentOptions: {
    url: 'http://localhost:3000/'
  },
  transform: {
    '^.+\\.ts?$': ['ts-jest', {
      compiler: 'ttypescript',
      tsconfig: 'tsconfig.jest.json'
    }]
  },
  testMatch: ['<rootDir>/tests/**/*.ts'],
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
