const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'vue.js',
    path: path.resolve(__dirname, 'dist')
  },
  // module: {
  //   rules: [{
  //     test: /\.js$/,
  //     exclude: [
  //       path.resolve(__dirname, 'node_modules')
  //     ],
  //     loader: 'babel-loader',
  //     query: {
  //       presets: ['es2015']
  //     }
  //   }]
  // },
  // resolve: {
  //   extensions: ['.json', '.js', '.jsx', '.css']
  // },
  // devtool: 'source-map',
  // devServer: {
  //   publicPath: path.join('/dist/')
  // },
  plugins: [
    new HTMLPlugin({
      title: 'vue demo',
      filename: 'index.html',
      template: './index.html',
      chunks: ['manifest', 'vendor', 'main'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
};