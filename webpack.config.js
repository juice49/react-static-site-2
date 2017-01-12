'use strict'

const path = require('path')
const { parse: parseUrl } = require('url')
const webpack = require('webpack')
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
    devtool: 'inline-source-map',
    devServer: {
      contentBase: `./${paths.public}`,
      publicPath: '/',
      compress: false, // xxx
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/': {
          target: 'http://localhost:8080', // xxx
          pathRewrite: (reqPath, req) => {
            const url = parseUrl(req.url)
            const extname = path.extname(url.pathname)

            const destination = reqPath !== '/' && !extname
              ? `${reqPath}.html`
              : reqPath

            console.log(req.headers)
            console.log(`> Proxying ${reqPath} to ${destination}`)
            return destination
          }
        }
      }
    }
  },
  {
    entry: './server.js',
    output: {
      path: path.resolve(__dirname, paths.public, paths.dist),
      filename: 'server.js'
    },
    target: 'node',
    module: webpackConfig.module
  },
  {
    entry: './src/serve.js',
    output: {
      path: path.resolve(__dirname, paths.dist),
      filename: 'serve.js'
    },
    target: 'node',
    module: webpackConfig.module
  }
]
