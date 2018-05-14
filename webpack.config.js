const { resolve } = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
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
        presets: [ 'env', 'react', 'stage-2' ]
      }
    }, {
      test: /\.s?css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
     new MiniCssExtractPlugin({
      //Options similar to the same options in webpackOptions.output. Both options are optional:
      filename: '[name].css',
      chunkFilenam: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: "It's not my fault that I don't know how many k's are in anxious",
      favicon: './assets/images/Ankkshus_favicon.ico',
      template: './src/index.html'
    })
  ]
};
