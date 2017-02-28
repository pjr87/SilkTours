var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: path.resolve(__dirname, '../src/client/scripts/client.js'),
  output: {
    //context: path.join(__dirname, "src"),
    //devtool: debug ? "inline-sourcemap" : null,
    //path: path.resolve(__dirname, '../dist/'),
    //publicPath: "./src/app/",
    //filename: 'bundle.js'
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /src\/.+.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
            cacheDirectory: true,
            presets: ['es2015', 'react'],
            plugins: ["react-hot-loader/babel"]
          }
        },
        {
          test: /\.css$/,
          loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]','image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
        }
    ]
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
  ]
};
