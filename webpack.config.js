var path = require('path'),
    nodeExternals = require('webpack-node-externals');

var BUILD_DIR = __dirname;
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: {
        main: APP_DIR + '/index.js'
    },
    output: {
        path: BUILD_DIR,
        filename: 'webpackDynamicsPlugin.js',
        libraryTarget: 'commonjs2',
        library: 'WebpackDynamicsPlugin'
    },
    module: {
        loaders: [
            {test: /\.js/, include: APP_DIR, loader: 'babel'},
            {test: /\.json/, loader: 'json'}
        ]
    },
    target: 'node',
    externals: [nodeExternals()]
};

module.exports = config;