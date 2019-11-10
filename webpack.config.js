require("dotenv").config();
const { resolve } = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { APP_NAME } = process.env;

module.exports = {
  entry: ["core-js/stable", "regenerator-runtime", "./src/index.tsx"],
  output: {
    path: resolve(__dirname, "./public"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: resolve(__dirname, "./public"),
    host: "0.0.0.0"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }, { loader: "ts-loader" }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ["public/*.js", "public/*.js.map"]
    }),
    new webpack.DefinePlugin({
      APP_NAME: JSON.stringify(APP_NAME)
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss"]
  },
  stats: {
    colors: true
  }
};
