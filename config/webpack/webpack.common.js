const webpack = require('webpack')
const path = require('path')

module.exports = options => ({
  devtool: options.devtool,
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd()),
    publicPath: '/',
  }, options.output),
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: ['svg-react-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.includes('node_modules'),
    }),
  ]),
  resolve: {
    alias: {
      config$: path.resolve(__dirname, '../..', 'config/settings.js'),
    },
    modules: [path.resolve(__dirname, '../..', 'src'), 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  target: 'web',
  performance: options.performance || {},
  devServer: options.devServer,
})
