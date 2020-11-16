const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './client/App.js',
  output: {
    path: path.join(__dirname, 'client/build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.jsx?$/,
        // exclude: /node_modules/,
        use: 'babel-loader',
        exclude: /node_modules[\\,/](?!(query-string)[\\,/]).*/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        // exclude: /node_modules\/(?!(query-string))/,
        include: [path.join(__dirname, 'node_modules', 'query-string')],
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'less-loader'},
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: 'client/index.html'}),
  ],
};
