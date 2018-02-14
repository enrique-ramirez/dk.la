const path = require('path')
const webpack = require('webpack')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const port = 8080

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/,
    failOnError: false,
  }),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: 'index.html',
    inject: 'body',
    minify: {
      removeComments: false,
      collapseWhitespace: false,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: false,
      minifyCSS: false,
      minifyURLs: false,
    },
    hash: true,
  }),
]

module.exports = require('./webpack.common')({
  devtool: 'source-map',

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    path.join(process.cwd(), 'src/app.js'),
  ],

  output: {
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[name].chunk.js',
  },

  plugins,

  performance: {
    hints: false,
  },

  devServer: {
    contentBase: path.join(process.cwd(), 'assets'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    port,
  },
})
