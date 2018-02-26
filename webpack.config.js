const { resolve } = require('path');

module.exports = env => {
  return {
    entry: './client/public/react.jsx',
    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'client', 'public', 'js')
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'env', 'react', 'stage-2' ]
        }
      }]
    }
  };
};
