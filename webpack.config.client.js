const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const clientConfig = {
  // Tell webpack our server root
  entry: './src/client/client.js',
  // Tell webpack where to put the output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};

module.exports = merge(baseConfig, clientConfig);
