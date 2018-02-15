var webpack = require('webpack');
require('dotenv').config();

module.exports = {
  context: __dirname,
  entry: ["react-hot-loader/patch", "./lib/_demo/demo.js"],
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
    }
  ],
  output: {
    path: __dirname + "/demo",
    filename: "bundle.js"
  }
};