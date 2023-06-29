module.exports = {
  verbose: true,
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['<rootDir>/tests/unit/**/*.ts'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'results',
      uniqueOutputName: 'true' // can't control name but it is unique
    }]
  ]
};
