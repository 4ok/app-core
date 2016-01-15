'use strict';

var app          = require('connect')();
var logger       = require('logger')();
var config       = require('config');
var errorhandler = require('errorhandler');
var serveStatic  = require('serve-static');
var Router       = require('./router.js');
var Http         = require('./http');

const ACTION_EPILOG = 'Action';

class Application {

    constructor(routes, controllersPath) {
        this._routes          = routes;
        this._controllersPath = controllersPath;
        this._middlewares     = [];
    }

    start() {
        this._initMiddlewares();
        this._initListener();
        this._logUncaughtException();
    }

    addMiddleware(middleware) {
        this._middlewares = this._middlewares.concat(middleware);
    }

    _initMiddlewares() {
        var middlewares = this._middlewares.concat(this._getDefaultMiddlewares());

        for (let middleware of middlewares) {
            app.use(middleware);
        }
    }

    _getDefaultMiddlewares() {

        return [
            errorhandler(),
            serveStatic(config.rootPath + '/public'), // TODO for dev, move to nginx
            this._onRequest.bind(this)
        ];
    }

    _onRequest(request, response) {
        request.route = this._findRoute(request);

        this._logRequestParams(request);

        if (request.route) {
            var http        = new Http(request, response);
            var routeParams = request.route.params;

            this._callController(routeParams.controller, routeParams.action, http);
        } else {
            this._showPage404(response, 'Route not found');
        }
    }

    _findRoute(request) {
        var router = new Router(this._routes);

        return router.findRoute(request.url);
    }

    _logRequestParams(req) {
        logger
            .break()
            .info('Request uri: %s', req.url);

        if (req.route) {
            logger
                .info('Route name:', req.route.name)
                .info('Route pattern:', req.route.pattern)
                .info('Route params:', req.route.params);
        }

        if (req.query !== undefined) {
            logger.info('Query params:', req.query);
        }

        if (req.body !== undefined) {
            logger.info('Post params:', req.body);
        }
    }

    _callController(controllerName, actionName, http) {
        var controllerPath = this._controllersPath + '/' + controllerName;
        var Controller     = require(controllerPath);
        var controller     = new Controller(http);

        var actionFullName = actionName + ACTION_EPILOG
        var action         = controller[actionFullName];

        action.call(controller);
    }

    _showPage404(response, text) {
        logger.info(text);

        response.statusCode = 404;
        response.end(text);
    }

    _initListener() {
        app.listen(
            config.server.port,
            config.server.host,
            this._listener.bind(this)
        );
    }

    _logUncaughtException() {
        process.stdin
            .resume()
            .on('uncaughtException', function (err) {
                var message = (err.getMessage)
                    ? err.getMessage()
                    : (err.stack || err);

                logger.error(message);
            });
    }

    _listener() {
        logger.info(
            'Server listening: %s://%s:%d',
            config.server.scheme,
            config.server.host,
            config.server.port
        );
    }
}

module.exports = Application;
