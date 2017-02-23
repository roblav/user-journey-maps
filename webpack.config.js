var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: {
    'vendor': './app/assets/javascripts/impress.js'
  },
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/javascripts/')
  }
};
