require('dotenv').config();
const { resolve } = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const { APP_NAME } = process.env;

const isDev = mode => mode === 'development';
const isProd = mode => mode === 'production';

module.exports = (_, argv) => ({
  entry: [
    'core-js/stable',
    'regenerator-runtime',
    'react-hot-loader/patch',
    './src/index.tsx'
  ],
  output: {
    path: resolve(__dirname, './public'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: isDev(argv.mode),
      cleanOnceBeforeBuildPatterns: ['*.js', '*.js.map']
    }),
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(APP_NAME)
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
  },
  stats: {
    colors: true
  }
});
