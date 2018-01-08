//var webpack = require('webpack');

const webpack = require("webpack");

module.exports = {
  entry: {
    "bundle": "./entry.js",
    "bundle.min": "./entry.js",
  },
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: "[name].js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};