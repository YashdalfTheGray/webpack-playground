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
  devServer: {
    contentBase: resolve(__dirname, './public'),
    host: '0.0.0.0'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev(argv.mode)
            }
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () =>
                isProd(argv.mode)
                  ? [autoprefixer(), cssnano()]
                  : [autoprefixer()]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev(argv.mode) ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev(argv.mode) ? '[id].css' : '[id].[hash].css'
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: [
        'public/artifacts',
        'public/*.js',
        'public/*.js.map',
        'public/*.css'
      ]
    }),
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(APP_NAME)
    })
  ].concat(
    isDev(argv.mode)
      ? [
          new Visualizer({
            filename: './artifacts/statistics.html'
          })
        ]
      : []
  ),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
  },
  stats: {
    colors: true
  }
});
