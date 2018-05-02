const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = [
  new UglifyJsPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.php',
    filename: 'index.php',
    inject: 'body',
    minify: {
      removeComments: true,
      collapseWhitespace: false,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    hash: false,
    cache: true,
  }),
]

module.exports = require('./webpack.common')({
  devtool: 'source-map',

  entry: [
    path.join(process.cwd(), 'src/app.js'),
  ],

  output: {
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[name].chunk.js',
    publicPath: 'http://enrique-ramirez.com/dkla/wp-content/themes/dk.la/',
  },

  plugins,

  performance: {
    assetFilter: assetFilename => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
})
