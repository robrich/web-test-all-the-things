
module.exports = {
  verbose: true,
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: ['<rootDir>/tests/unit/**/*.ts'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'results',
      uniqueOutputName: 'true'
    }]
  ]
};
