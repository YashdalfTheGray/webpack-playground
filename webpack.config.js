require('dotenv').config();
const { resolve } = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const { APP_NAME } = process.env;

module.exports = {
  entry: ['core-js/stable', 'regenerator-runtime', './src/index.tsx'],
  output: {
    path: resolve(__dirname, './public'),
    filename: 'bundle.js'
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
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 2 }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () =>
                  argv.mode === 'production'
                    ? [autoprefixer(), cssnano()]
                    : [autoprefixer()]
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: [
        'public/*.js',
        'public/*.js.map',
        'public/*.css'
      ]
    }),
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(APP_NAME)
    })
  ].concat(
    argv.mode === 'development'
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
};
