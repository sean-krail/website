const path = require("path");
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "app.[hash].js"
  }
});
