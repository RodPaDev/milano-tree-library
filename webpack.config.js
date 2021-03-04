const path = require('path')

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.ts?$/, loader: 'ts-loader' }
        ]
    }
};