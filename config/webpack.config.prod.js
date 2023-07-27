'use strict';

const webpack                  = require('webpack');
const { merge }                = require('webpack-merge')
const MiniCSSExtractPlugin     = require('mini-css-extract-plugin');
const TerserPlugin             = require("terser-webpack-plugin");
const CompressionPlugin        = require('compression-webpack-plugin');
const HtmlWebpackPlugin        = require('html-webpack-plugin');
const JavaScriptObfuscator     = require('webpack-obfuscator');
const helpers                  = require('./helpers');
const commonConfig             = require('./webpack.config.common');
const Dotenv                   = require('dotenv-webpack');
const CopyPlugin               = require("copy-webpack-plugin");

const webpackConfig = merge(commonConfig, {
    mode: 'production',
    output: {
        clean: true,
        path: helpers.root('dist/prod'),
        publicPath: '/cobraEnrollmentUI/',
        filename: 'js/[contenthash:8].prod.bundle.js',
        chunkFilename: 'js/[contenthash:8].prod.chunk.js',
        assetModuleFilename: 'assets/prod-[hash][ext]'
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [
            new TerserPlugin({
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
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    filename: 'js/[contenthash:8].prod.bundle.js',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/
                },
                styles: {
                    test: /\.css$/,
                    name: 'styles',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new TerserPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production', 
            DEBUG: false,
          }),
        new MiniCSSExtractPlugin({
            filename: 'css/[name].[fullhash].prod.css',
            chunkFilename: 'css/[id].[fullhash].prod.css'
        }),
        new CompressionPlugin({
            filename: 'assets/[name].[fullhash].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8
        }),
        new HtmlWebpackPlugin({
            template: './src/assets/baseIndex.html',
            filename: 'index.html'
        }),
        new JavaScriptObfuscator ({
            rotateStringArray: true
        }, ['excluded_bundle_name.js']),
        new Dotenv({
                path: './.env.production',
            }
        )
    ]
});

module.exports = webpackConfig;