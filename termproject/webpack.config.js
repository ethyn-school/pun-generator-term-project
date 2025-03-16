const webpack = require('webpack');
const path = require('path');
const copyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
let htmlPageNames = ["index", "archive"];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});


module.exports = {
    mode: 'development',
    entry: {
      index: './src/js/index.js',
      archive: './src/js/archive.js',
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: '[name].bundle.js',
      assetModuleFilename: "images/[name][ext]",
      clean: true,
    },
    target: 'web',
    devServer: { 
      static: "./dist"
    }, 
    devtool: 'source-map', 
    module: {
      rules: [	
        { 
          test: /\.js$/i,
          exclude: /(node_modules)/,
          use: { 
            loader: 'babel-loader', 
            options: {
            presets: ['@babel/preset-env']
          }}
        }
      ],
    },
    plugins: [
      new copyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/css"),
            to: path.resolve(__dirname, "dist/css"),
          },
          {
            from: path.resolve(__dirname, "src/images"),
            to: path.resolve(__dirname, "dist/images"),
          },
        ],
      }),
    ].concat(multipleHtmlPlugins)
}
  