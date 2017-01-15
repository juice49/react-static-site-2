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
      // Um? https://github.com/gaearon/react-hot-loader/issues/303#issuecomment-264646649
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
    devtool: 'inline-eval-cheap-source-map',
    devServer: {
      contentBase: `./${paths.public}`,
      publicPath: '/',
      compress: false, // xxx
      historyApiFallback: true,
      hot: true
      /*proxy: {
        '/': {
          //onProxyReq: proxyReq => proxyReq.setHeader('x-foo', 'bar'),
          //onProxyRes: (proxyReq, req, res) => res.write('hey!'),
          target: 'http://localhost:8080', // xxx
          pathRewrite: (reqPath, req) => {
            const url = parseUrl(req.url)
            const extname = path.extname(url.pathname)

            console.log('PROXY', req)
            return undefined

            const destination = reqPath !== '/' && !extname && !req.headers['x-foo']
              ? `${reqPath}.html`
              : reqPath

            console.log(req.headers)
            console.log(`> Proxying ${reqPath} to ${destination}`)
            return destination
          }
        }
      }*/
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
