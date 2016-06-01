var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'dist');
var sourcePath = path.resolve(__dirname, 'src');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

const production = process.argv.find((element) => element === '--production') ? true : false;

const jsBaseEntry = [
  'babel-polyfill',
  sourcePath + '/js/app.js'
];

var config = {
    entry: {
        js: jsBaseEntry,
        html: sourcePath + '/index.html'
    },
    output: {
        path: buildPath,
        filename: 'dist/app.js'
    },
    plugins: [],
    module: {
        preLoaders: [
      {
          test: /\.(js|jsx)$/,
          loader: 'eslint-loader',
          include: [path.resolve(__dirname, 'src/app')],
          exclude: [nodeModulesPath]
      }
    ],
        loaders: [
      {
          test: /\.(js|jsx)$/,
          exclude: [nodeModulesPath],
          loaders: [
            'babel?' + JSON.stringify({
                presets: ['react', 'es2015']
            })
        ]
      },
      {
          test: /\.(html)$/,
          loader: 'file?name=[name].[ext]'
      }
    ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: __dirname
    },
    devtool: 'source-map'
};

if (production) {
    process.env.NODE_ENV = 'production';

    config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
  ].concat(config.plugins);
}

module.exports = config;
