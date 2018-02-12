const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const plugins = [
  new UglifyJsPlugin(),
  new HtmlWebpackPlugin({
    template: 'frontend/src/index.php',
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
  }),
]

module.exports = require('./webpack.common')({
  devtool: undefined,

  entry: [
    path.join(process.cwd(), 'frontend/src/app.js'),
  ],

  output: {
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[name].chunk.js',
    publicPath: '<?php echo get_template_directory_uri() ?>/',
  },

  plugins,

  performance: {
    assetFilter: assetFilename => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
  },
})
