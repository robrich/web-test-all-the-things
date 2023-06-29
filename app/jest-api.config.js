module.exports = {
  verbose: true,
  testEnvironment: 'node', // for axios
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['<rootDir>/tests/api/**/*.ts'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'results',
      uniqueOutputName: 'true' // can't control name but it is unique
    }]
  ]
};
