/* eslint-disable */

const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./common.js');

let envs = {};
const result = dotenv.config();
if (result.parsed) {
  envs = result.parsed;
}

module.exports = Object.assign({}, common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({}),
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      ...envs,
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ]
});
