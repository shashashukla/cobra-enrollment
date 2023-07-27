'use strict';

const webpack              = require('webpack');
const { merge }            = require('webpack-merge')
const TerserPlugin         = require("terser-webpack-plugin");
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const helpers              = require('./helpers');
const commonConfig         = require('./webpack.config.common');
const Dotenv               = require('dotenv-webpack');
const CopyPlugin           = require("copy-webpack-plugin");

const webpackConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval',
    output: {
        clean: true,
        path: helpers.root('dist/test'),
        publicPath: '/cobraEnrollmentUI/',
        filename: 'js/[contenthash:8].test.bundle.js',
        chunkFilename: 'js/[contenthash:8].test.chunk.js',
        assetModuleFilename: 'assets/test-[hash][ext]'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                exclude: 'progressier.js',
                test: /\.js(\?.*)?$/i,
                terserOptions: {
                    ecma: undefined,
                    parse: {},
                    compress: {},
                    mangle: true, 
                    module: false,
                  },
              }),
        ],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', 
            DEBUG: true,
          }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/assets/baseIndex.html',
            filename: 'index.html'
        }),
        new Dotenv({
                path: './.env.test',
            }
        )
        ],
    devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        overlay: true,
        port: 8000,
        stats: {
            normal: true
        }
    }
});

module.exports = webpackConfig;