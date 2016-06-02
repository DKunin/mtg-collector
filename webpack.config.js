var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/index'],
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.[hash].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue']
    },
    module: {
        loaders: [
          { test: /\.js$/, loaders: ['babel-loader'], exclude: [/node_modules/] },
          { test: /\.vue$/, loaders: ['vue'], exclude: [/node_modules/] }
        ]
    },
    plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        __DEV__: true
    }),
    new HtmlWebpackPlugin({
        title: 'MTG Collector',
        template: './src/index.tpl'
    })
  ]
};
