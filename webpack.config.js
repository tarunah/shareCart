let merge = require('webpack-merge');
let { baseConfig } = require('./webpack.base');
let env = process.env.NODE_ENV;

let config = {};
if (env === 'production') {
  console.log('webpack: prod config selected');
  config = merge(baseConfig, require('./webpack.prod'));
} else {
  console.log('webpack: dev config selected');
  config = merge(baseConfig, require('./webpack.dev'));
}

module.exports = config;
