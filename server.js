'use strict';

require('dotenv').config();

var express = require('express');
var server = express();
var proxy = require('proxy-middleware');
var url = require('url');
var path = require('path');
var morgan = require('morgan');
var API_URL = 'http://localhost:8000/'
var CLIENT_PORT = 8080;

if (process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');

    var config = require('./webpack/webpack.config.dev');
    var compiler = webpack(config);
    var webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    });

    var logger = morgan('dev');

    server.use(webpackDevMiddlewareInstance);
    server.use(logger);

    // Apply hot module reloading middleware
    server.use(webpackHotMiddleware(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));

    // start localhost server on CLIENT_PORT
    server.listen(CLIENT_PORT, function() {
        webpackDevMiddlewareInstance.waitUntilValid(function(){
            console.log(process.env.NODE_ENV + ' server listening at localhost:' + CLIENT_PORT);
        });
    });

    // Proxy settings for connecting to API
    // process.env.API_URL is an environment variable set on the server environment
    server.use('/api', proxy(url.parse(API_URL)));

    //serve static stuff
    server.use('/static', express.static('static'))

    // serve the app's index.html file when accessing any path
    server.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'src/index.dev.html'));
    });

} else {

    var logger = morgan('short');

    //serve static stuff
    server.use('/static', express.static('static'));
    server.use('/dist', express.static('dist'));
    server.use(logger);

    server.listen(CLIENT_PORT, function() {
        console.log('PRODUCTION server listening at localhost:' + CLIENT_PORT);
    });

    server.use('/api', proxy(url.parse(API_URL)));

    server.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'src/index.html'));
    });

}