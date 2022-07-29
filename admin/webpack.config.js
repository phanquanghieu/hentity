const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join } = require('path')

module.exports = {
  mode: 'production',
  entry: join(__dirname, 'src/index.jsx'),
  output: {
    path: join(__dirname, 'build'),
    filename: '[contenthash:8].bundle.js',
    chunkFilename: '[contenthash:8].chunk.js',
    publicPath: '/admin/',
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
  resolve: {
    extensions: ['.jsx', '...'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'src/index.html'),
    }),
  ],
}
