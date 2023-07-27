'use strict';

const { merge }            = require('webpack-merge')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const helpers              = require('./helpers');
const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

const webpackConfig = {
    entry: {
        main: helpers.root('src', 'main'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [ helpers.root('src') ]
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: {
                    or: [
                        /node_modules/,
                        /tests/
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    !isProduction ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: !isProduction } },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    !isProduction ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: !isProduction } },
                    { loader: 'sass-loader', options: { sourceMap: !isProduction } }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    !isProduction ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: !isProduction } },
                    { loader: 'sass-loader', options: { sourceMap: !isProduction } }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCSSExtractPlugin()
    ],
    resolve: {
        fallback: {
            vue: require.resolve('vue')
        },
        extensions: [ '.*','.js', '.vue', '.ts', '.tsx' ],
        alias: {
            'vue$': !isProduction ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
            '@': helpers.root('src')
        }
    }
};

module.exports = webpackConfig;