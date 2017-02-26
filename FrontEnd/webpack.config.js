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
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]','image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
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
  postcss: function() {
    return [
      require('postcss-import')({ // Import all the css files...
        onImport: function (files) {
            files.forEach(this.addDependency); // ...and add dependecies from the main.css files to the other css files...
        }.bind(this) // ...so they get hot–reloaded when something changes...
      }),
      require('postcss-simple-vars')(), // ...then replace the variables...
      require('postcss-focus')(), // ...add a :focus to ever :hover...
      require('autoprefixer')({ // ...and add vendor prefixes...
        browsers: ['last 2 versions', 'IE > 8'] // ...supporting the last 2 major browser versions and IE 8 and up...
      }),
      require('postcss-reporter')({ // This plugin makes sure we get warnings in the console
        clearMessages: true
      })
    ];
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
  ]
};
