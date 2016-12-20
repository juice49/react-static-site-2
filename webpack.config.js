'use strict'

const path = require('path')
const webpack = require('webpack')
const { paths } = require('./config')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: {
    path: path.resolve(__dirname, paths.public, paths.dist),
    publicPath: `/${paths.dist}/`,
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js?$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    /*new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),*/
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: `./${paths.public}`,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    hot: true
  }
}
