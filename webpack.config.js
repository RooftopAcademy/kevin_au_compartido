const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    "app.bundle": './src/app.ts'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
};
