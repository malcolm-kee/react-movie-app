// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');

/**
 * @type {webpack.Configuration}
 */
module.exports = {
  output: {
    chunkFilename: '[name].bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};
