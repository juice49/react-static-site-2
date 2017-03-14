'use strict'

const path = require('path')
const webpack = require('webpack')
const express = require('express')
const { paths } = require('./config')

const webpackConfig = {
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js?$/,
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = [
  {
    entry: [
      // Um? https://github.com/gaearon/react-hot-loader/issues/303#issuecomment-264646649
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './client.js'
    ],
    output: {
      path: path.resolve(__dirname, paths.public, paths.dist),
      publicPath: `/${paths.dist}/`,
      filename: 'index.js'
    },
    module: webpackConfig.module,
    plugins: [
      /*new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),*/
      /*new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: true
        }
      }),*/
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ],
    devtool: process.env.NODE_ENV === 'production'
      ? 'source-map'
      : 'cheap-eval-source-map',
    devServer: {
      contentBase: `./${paths.public}`,
      publicPath: '/',
      compress: false, // xxx
      historyApiFallback: {
        rewrites: [
          {
            from: /^\/$/,
            to: '/index.html'
          }
        ]
      },
      hot: true,
      quiet: true,
      setup: app => {
        app.use(
          express.static(
            `./${paths.public}`,
            { extensions: [ 'html' ] }
          )
        )
      }
    }
  },
  {
    entry: './server.js',
    output: {
      path: path.resolve(__dirname, paths.dist),
      filename: 'server.js'
    },
    target: 'node',
    module: webpackConfig.module
  },
  {
    entry: './json.js',
    output: {
      path: path.resolve(__dirname, paths.dist),
      filename: 'json.js'
    },
    target: 'node',
    module: webpackConfig.module
  }
]
