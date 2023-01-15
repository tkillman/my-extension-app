const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        popup: './src/popup.tsx',
        content: './src/content.ts',
        background: './src/background.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: '[name]_bundle.js',
    },
    optimization: {
        minimizer: [new TerserPlugin({ extractComments: false })],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: './src/popup.html',
            inject: false,
        }),
        new CopyPlugin({
            patterns: [{ from: 'manifest.json', to: '.' }],
        }),
    ],
};
