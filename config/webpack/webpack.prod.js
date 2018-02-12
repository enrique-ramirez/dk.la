const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const plugins = [
  new UglifyJsPlugin(),
]

module.exports = require('./webpack.common')({
  devtool: undefined,

  entry: [
    path.join(process.cwd(), 'frontend/src/app.js'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  plugins,

  performance: {
    assetFilter: assetFilename => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
})
