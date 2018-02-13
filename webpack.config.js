var webpack = require('webpack');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
require('dotenv').config();

module.exports = {
  context: __dirname,
  entry: ["react-hot-loader/patch", "./src/_demo/demo.js"],
  module: {
    loaders: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: './demo',
    hot: true
  },
  plugins: [
    function() {//I want a timestamp each time webpack builds cos I can't tell if the console output is for recent or past build
      this.plugin('watch-run', function(watching, callback) {
          console.log('==>>> Begin compile at ' + new Date());
          callback();
      })
    }/*,      
    new webpack.EnvironmentPlugin([
       'NODE_ENV', 'HOST', 'PORT'
    ]),
    new CopyWebpackPlugin([
      { context: 'src/app/static_css/font-awesome/css/', from: '*.min.css', to: 'css/font-awesome/css/'},
      { context: 'src/app/static_css/font-awesome/fonts/', from: '*.*', to: 'css/font-awesome/fonts/'},
      { context: 'src/app/static_css/', from: '*.css', to: 'css/'},
      { context: 'src/app/static_js/', from: '*.js', to: 'js/'},
      { from: 'src/app/index.html', to: 'index.html'}
    ])*/
  ],
  output: {
    path: __dirname + "/demo",
    filename: "bundle.js"
  }
};