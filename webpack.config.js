const { resolve } = require('path');

module.exports = {
    entry: './client/index.js',
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
      }]
    }
};
