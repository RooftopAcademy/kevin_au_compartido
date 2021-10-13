const path = require('path');

module.exports = {
  watch: true,
  mode: 'development',
  entry: {
    "app.bundle": './src/app.ts'
  },
  output: {
    path: path.resolve(__dirname, './public/assets/js'),
    filename: '[name].js',
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    devMiddleware: {
      writeToDisk: true,
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
};
