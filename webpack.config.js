const { resolve } = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      CompressionPlugin = require('compression-webpack-plugin');
      
//const webpack = require('webpack'),
//      webpackMerge = require('webpack-merge'),
//      modeConfig = env => require(`./src/configs/webpack/webpack.${env}`)(env),
//      presetConfig = require('./src/configs/webpack/loadPresets');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
          // Stage 2
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          "@babel/plugin-proposal-function-sent",
          "@babel/plugin-proposal-export-namespace-from",
          "@babel/plugin-proposal-numeric-separator",
          "@babel/plugin-proposal-throw-expressions",

          // Stage 3
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-syntax-import-meta",
          ["@babel/plugin-proposal-class-properties", { "loose": false }],
          "@babel/plugin-proposal-json-strings"
        ]
      }
    }, {
      test: /\.(scss|css)$/,
      use: [
        MiniCssExtractPlugin.loader, 
        'css-loader', 
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './assets/images/Ankkshus_favicon.ico',
      template: './src/index.html'
    }),
     new MiniCssExtractPlugin({
      //Options similar to the same options in webpackOptions.output. Both options are optional:
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CompressionPlugin()
  ]
};

//const applyConfig = ({mode, presets} = {mode: 'production', presets: []}) => (
//  webpackMerge(
//    {
//      mode,
//      output: {
//        filename: 'bundle.js',
//        path: resolve(__dirname, 'dist')
//      },
//      resolve: {
//        extensions: ['.js', '.jsx', '.json']
//      },
//      module: {
//        rules: {
//          test: /\.jsx?$/,
//          exclude: /node_modules/,
//          loader: 'babel-loader',
//          options: {
//            presets: [['env', {modules: false}], 'react', 'stage-2']
//          }
//        }
//      }
//    },
//    modeConfig(mode),
//    presetConfig({mode, preset})
//  );
//)
//
//module.exports = applyConfig;