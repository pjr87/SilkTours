var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: path.resolve(__dirname, '../src/client/scripts/client.js'),
  output: {
    context: path.join(__dirname, "src"),
    devtool: debug ? "inline-sourcemap" : null,
    path: path.resolve(__dirname, '../src/client'),
    publicPath: "./src/app/",
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /src\/.+.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};
