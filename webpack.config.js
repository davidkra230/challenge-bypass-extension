const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        popup:'./src/popup/index.tsx',
        background: './src/background/index.ts',
    },
    mode: 'production',
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.scss?$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
            { test: /\.(png|jpe?g|gif|svg)$/, use: 'file-loader' },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            'buffer': require.resolve('buffer/'),
            'crypto': require.resolve('crypto-browserify'),
            'stream': require.resolve('stream-browserify'),
        },
        alias: {
            '@root': path.resolve(__dirname),
            '@public': path.resolve(__dirname, 'public'),
            '@background': path.resolve(__dirname, 'src/background'),
            '@popup': path.resolve(__dirname, 'src/popup'),
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/icons', to: 'icons' },
                { from: 'public/manifest.json' },
            ],
        }),
        new HtmlWebpackPlugin({
            chunks: ['popup'],
            filename: 'popup.html',
            template: 'public/popup.html',
        }),
        new MiniCssExtractPlugin(),
    ],
    performance: {
        maxAssetSize: 600000,
        maxEntrypointSize: 600000,
        hints: 'error',
    },
};
