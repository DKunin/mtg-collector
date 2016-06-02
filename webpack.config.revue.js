var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src2/index'],
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: __dirname + '/dist2',
        filename: 'bundle.[hash].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue']
    },
    module: {
        loaders: [
          { test: /\.js$/, loaders: ['babel'], exclude: [/node_modules/] },
          { test: /\.vue$/, loaders: ['vue'], exclude: [/node_modules/] }
        ]
    },
    plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        __DEV__: true
    }),
    new HtmlWebpackPlugin({
        title: 'Revue',
        template: './src2/index.tpl'
    })
  ],
    babel: {
        presets: ['es2015', 'stage-0']
    }
};
