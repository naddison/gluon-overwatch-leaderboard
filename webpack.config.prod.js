const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                ['es2015', { modules: false }],
                                'react',
                                'stage-0'
                            ],
                            plugins: [
                                'react-hot-loader/babel',
                                'transform-class-properties',
                                'transform-decorators-legacy',
                                ['module-resolver', {
                                    root: ['./src'],
                                    alias: {
                                        underscore: 'lodash'
                                    }
                                }]
                            ]
                        }
                    },
                    {
                        loader: 'eslint-loader'
                    },
                    {
                        loader: 'stylelint-custom-processor-loader'
                    }
                ],
                include: path.resolve(__dirname, '..', 'src')
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/',
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('prod')
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'auto',
            hash: true,
            inject: 'body',
            xhtml: true
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: '.eslintrc',
                    extensions: ['.js', '.jsx'],
                    ignorePath: '.gitignore',
                    cache: true,
                    formatter: require('eslint-friendly-formatter')
                },
                debug: false
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '..', 'src/favicon.ico'),
                to: path.resolve(__dirname, '..', 'dist/favicon.ico')
            }
        ])
    ]
};