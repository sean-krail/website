const path = require("path");
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  output: {
    filename: "app.js"
  },
  devServer: {
    historyApiFallback: true,
    stats: "minimal"
  }
});
