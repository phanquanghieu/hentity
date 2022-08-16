const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { join } = require('path')

module.exports = {
  mode: 'development',
  entry: join(__dirname, 'src/index.jsx'),
  output: {
    path: join(__dirname, 'build'),
    filename: 'bundle.[name].js',
    chunkFilename: 'chunk.[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: join(__dirname, 'src'),
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(svg|eot|otf|ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1000,
          },
        },
      },
    ],
  },
  devServer: {
    port: '1403',
    historyApiFallback: true,
    open: true,
    hot: true,
  },
  resolve: {
    extensions: ['.jsx', '...'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'src/index.html'),
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.BACKEND_URL': JSON.stringify('http://localhost:9322'),
      'process.env.ADMIN_PATH': JSON.stringify('/'),
    }),
  ],
}
