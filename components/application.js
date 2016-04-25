'use strict';

const app = require('connect')();
const logger = require('logger')();
const config = require('config');
const errorhandler = require('errorhandler');
const connectQuery = require('connect-query');
const serveStatic = require('serve-static');
const Router = require('./router');
const Http = require('./http');

const ACTION_EPILOG = 'Action';

module.exports = class {

    constructor(routes, controllersDir) {
        this._routes = routes;
        this._controllersDir = controllersDir;
        this._middlewares = [];
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
        const middlewares = this._middlewares.concat(this._getDefaultMiddlewares());

        for (const middleware of middlewares) {
            app.use(middleware);
        }
    }

    _getDefaultMiddlewares() {
        return [
            errorhandler(),
            connectQuery(),
            serveStatic(config.rootPath + '/public'), // TODO for dev, move to nginx
            serveStatic(config.rootPath + '/bem'), // TODO for dev, move to nginx
            this._onRequest.bind(this),
        ];
    }

    _onRequest(request, response) {
        request.route = this._findRoute(request);

        if (request.route) {
            const http = new Http(request, response);
            const routeParams = request.route.params;

            this._callController(routeParams.controller, routeParams.action, http);
        } else {
            this._showPage404(response, 'Route not found');
        }
    }

    _findRoute(request) {
        const router = new Router(this._routes);

        return router.findRoute(request.url);
    }

    _callController(controllerName, actionName, http) { // TODO
        const controllerPath = this._controllersDir + '/' + controllerName;
        const Controller = require(controllerPath);
        const controller = new Controller(http);
        const actionFullName = actionName + ACTION_EPILOG;
        const action = controller[actionFullName];

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
            .on('uncaughtException', err => {
                const message = (err.getMessage)
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
};
