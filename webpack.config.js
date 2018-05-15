const { resolve } = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');
      
//const webpack = require('webpack'),
//      webpackMerge = require('webpack-merge'),
//      modeConfig = env => require(`./src/configs/webpack/webpack.${env}`)(env),
//      presetConfig = require('./src/configs/webpack/loadPresets');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
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
        presets: [ ['env', {modules: false}], 'react', 'stage-2' ]
      }
    }, {
      test: /\.(scss|css)$/,
      use: [
        MiniCssExtractPlugin.loader, 
        { 
          loader: 'css-loader', 
          options: { 
            minimize: {
              safe: true
            }
          }
        }, 
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "It's not my fault that I don't know how many k's are in anxious",
      favicon: './assets/images/Ankkshus_favicon.ico',
      template: './src/index.html'
    }),
     new MiniCssExtractPlugin({
      //Options similar to the same options in webpackOptions.output. Both options are optional:
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
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