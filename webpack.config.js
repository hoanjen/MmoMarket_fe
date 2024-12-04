const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');

dotenv.config();

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@api': path.resolve(__dirname, 'src/api/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@stores': path.resolve(__dirname, 'src/stores/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
    },
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
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg|ico)$/, 
        use: [
          {
            loader: 'file-loader', 
            options: {
              name: '[name].[hash].[ext]', 
              outputPath: 'assets/images/', 
              publicPath: 'assets/images/',
            },
          },
        ],
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
      'process.env': JSON.stringify(process.env),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '' }, // Sao chép tất cả tệp trong thư mục public vào dist
      ],
    }),
  ],
};
