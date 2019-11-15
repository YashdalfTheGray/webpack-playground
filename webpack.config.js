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

module.exports = {};
