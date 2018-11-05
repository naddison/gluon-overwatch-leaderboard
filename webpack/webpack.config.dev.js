const path = require('path');
const webpack = require('webpack');

const API_URL = process.env.API_URL || 'http://localhost:5555/';

module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true?path=http://localhost:5000/__webpack_hmr',
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                'es2015',
                                'react',
                                'stage-0'
                            ],
                            plugins: [
                                ['module-resolver', {
                                    root: ['./src'],
                                    alias: {
                                        underscore: 'lodash'
                                    }
                                }]
                            ]
                        }
                    },
                ],
                include: path.resolve(__dirname, '..','src')
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    resolve: {
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev'),
            'process.env.BATTLE_TAGS': JSON.stringify(process.env.BATTLE_TAGS)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: '.eslintrc',
                    extensions: ['.js', '.jsx'],
                    ignorePath: '.gitignore',
                    cache: true,
                    formatter: require('eslint-friendly-formatter')
                },
                debug: true
            }
        })
    ]
};