const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: "bundle.[hash].js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': './src',
            '@core': './src/core'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CopyWebpackPlugin({
            from: './src/favicon.ico',
            to: 'dist'
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: '/\.s[ac]ss$/i',
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },
            {
                test: '/\.js$/',
                exclude: '/node_modules/',
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}
