var Promise = require('es6-promise').Promise;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var entry_path = path.resolve(__dirname, 'static/components/entry.jsx');
var output_path = path.resolve(__dirname, 'build/');

module.exports = {
    entry: [
        entry_path,
        './static/styles/styles.styl'
    ],
    output: {
        path: output_path,
        filename: "index.js"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                  presets: ['es2015', 'react']
                }
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
               // loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('index.css')
    ]
};