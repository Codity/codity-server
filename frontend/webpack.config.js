var path = require('path');

var entry_path = path.resolve(__dirname, 'static/components/entry.jsx');
var output_path = path.resolve(__dirname, 'build/');

module.exports = {
    entry: entry_path,
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
            }
        ]
    }
};