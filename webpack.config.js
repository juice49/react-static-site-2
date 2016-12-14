'use strict'

const webpack = require('webpack')

module.exports = {
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js?$/
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]
}
