const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.config.base');

const serverConfig = {
  // Inform webpack that were building for NodeJs
  target: 'node',
  // Tell webpack our server root
  entry: './src/index.js',
  // Tell webpack where to put the output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, serverConfig);
