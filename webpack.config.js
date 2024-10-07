const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  entry: './src/index.tsx',
  mode:'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: "/",
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias:{
      '@components': path.resolve(__dirname, 'src/components/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Thêm rule cho CSS
        use: ['style-loader', 'css-loader','postcss-loader'],
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    static: './dist',
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
   })
  ],
};
