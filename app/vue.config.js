module.exports = {
  transpileDependencies: true,
  outputDir: '../api/dist/public',
  devServer: {
    proxy: {
      '^/api/': {
        target: 'http://localhost:3000'
      }
    }
  }
};
