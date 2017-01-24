var webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch', './src/app/index.js'],
  output: {
    //context: path.join(__dirname, "src"),
    //devtool: debug ? "inline-sourcemap" : null,
    //path: path.resolve(__dirname, '../dist/'),
    //publicPath: "./src/app/",
    //filename: 'bundle.js'
    path: __dirname + '/src/client/',
    filename: 'bundle.js'
  },

  devServer: {
      hot: true,
      inline: true,
      host: '0.0.0.0',
      port: 3000,
      historyApiFallback: true,
      contentBase: __dirname + '/src/client/',
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
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime']
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
        },
        { 
          test: /\.html$/,
          loader: 'html' 
        }
    ]
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
  ]
};
