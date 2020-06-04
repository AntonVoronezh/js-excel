const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
    // context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: ['@babel/polyfill','./src/index.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': './src',
            '@core': './src/core'
        }
    },
    devtool: isProd ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDev
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                removeComments : isProd,
                collapseWhitespace: isProd
            }
        }),
        // new CopyWebpackPlugin([
        //     {
        //     from: './src/favicon.ico',
        //     to: 'dist'        }
        //     ]),
        new MiniCssExtractPlugin({
            filename: filename('css')
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
