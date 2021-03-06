'use strict';

var webpack = require('webpack')
var path = require('path');
var str = JSON.stringify;
var env = process.env;

module.exports = {
  target: 'web',
  entry: {
    'bcoin': './lib/bcoin-browser',
    'bcoin-master': './lib/workers/master'
  },
  output: {
    path: path.join(__dirname, 'browser'),
    filename: '[name].js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['-browser.js', '.js', '.json']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: path.join(__dirname, 'node_modules'),
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BCOIN_NETWORK':
        str(env.BCOIN_NETWORK || 'main'),
      'process.env.BCOIN_WORKERS_ENABLED':
        str(env.BCOIN_WORKERS_ENABLED || '0'),
      'process.env.BCOIN_WORKER_URL':
        str(env.BCOIN_WORKER_URL || '/bcoin-worker.js'),
      'process.env.BCOIN_MASTER_URL':
        str(env.BCOIN_MASTER_URL || '/bcoin-master.js')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
