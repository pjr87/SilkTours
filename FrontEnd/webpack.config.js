var webpack = require('webpack');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname);

module.exports = {
  entry: ['react-hot-loader/patch', path.resolve(ROOT_PATH, './src/app')],
  cssLoaders: ['file-loader?name=[path][name].[ext]', 'postcss-loader'],
  output: {
    //context: path.join(__dirname, "src"),
    //devtool: debug ? "inline-sourcemap" : null,
    //path: path.resolve(__dirname, '../dist/'),
    //publicPath: "./src/app/",
    //filename: 'bundle.js'
    path: __dirname + '/src/public/',
    filename: 'bundle.js'
  },

  devServer: {
      hot: true,
      inline: true,
      host: '0.0.0.0',
      port: 3000,
      historyApiFallback: true,
      contentBase: __dirname + '/src/public/',
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
          plugins: ['transform-runtime', 'transform-decorators-legacy']
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
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      components: path.resolve(ROOT_PATH, 'src/app/components'),
      pages: path.resolve(ROOT_PATH, 'src/app/pages')
    },
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
  ]
};
