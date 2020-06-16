/* eslint-disable */

const webpack = require('webpack');
const { resolve } = require('path');
const common = require('./common.js');
const dotenv = require('dotenv');

let envs = {};
const result = dotenv.config();
if (result.parsed) {
  envs = result.parsed;
}

module.exports = Object.assign({}, common, {
  mode: 'development',
  watch: true,
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      ...process.env,
      ...envs,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve(__dirname, '..', 'build'),
    compress: true,
    port: process.env.NODE_PORT,
    hot: true,
    historyApiFallback: true,
  },
})
