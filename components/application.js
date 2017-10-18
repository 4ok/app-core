const app = require('connect')();
const logger = require('logger')();
const config = require('config');
const errorhandler = require('errorhandler');
const connectQuery = require('connect-query');
const serveStatic = require('serve-static');
const connectSlashes = require('connect-slashes');
const Router = require('./router');
const Http = require('./http');

const ACTION_EPILOG = 'Action';

const SERVER_CONFIG_DEFAULT = {
    scheme: 'http',
    host: 'localhost',
    port: 3000,
};

module.exports = class {

    constructor(routes, controllersDir) {
        this._routes = routes;
        this._controllersDir = controllersDir;
        this._middlewares = [];

        this._server = {
            scheme: config.server.scheme || SERVER_CONFIG_DEFAULT.scheme,
            host: config.server.host || SERVER_CONFIG_DEFAULT.host,
            port: config.server.port || SERVER_CONFIG_DEFAULT.port,
        };
    }

    start() {
        this._initMiddlewares();
        this._initListener();
        // eslint-disable-next-line no-underscore-dangle
        this._logUncaughtException();
    }

    addMiddleware(middleware) {
        this._middlewares = this._middlewares.concat(middleware);
    }

    _initMiddlewares() {
        const middlewares = this._middlewares.concat(this._getDefaultMiddlewares());

        middlewares.forEach(middleware => app.use(middleware));
    }

    _getDefaultMiddlewares() {
        return [
            errorhandler(),
            connectQuery(),
            serveStatic(config.rootPath + '/public'), // TODO for dev, move to nginx
            serveStatic(config.rootPath + '/bem'), // TODO for dev, move to nginx
            connectSlashes(),
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
            // eslint-disable-next-line no-underscore-dangle
            this.constructor._showPage404(response, 'Route not found. Url: ' + request.url);
        }
    }

    _findRoute(request) {
        const router = new Router(this._routes);

        return router.findRoute(request.url);
    }

    _callController(controllerName, actionName, http) { // TODO
        const controllerPath = this._controllersDir + '/' + controllerName;

        // eslint-disable-next-line global-require, import/no-dynamic-require
        const Controller = require(controllerPath);
        const controller = new Controller(http);
        const actionFullName = actionName + ACTION_EPILOG;
        const action = controller[actionFullName];

        action.call(controller);
    }

    static _showPage404(response, text) {
        logger.info(text);

        response.statusCode = 404;
        response.end(text);
    }

    _initListener() {
        const server = this._server;

        app.listen(server.port, server.host, this._listener.bind(this));
    }

    static _logUncaughtException() {
        process.stdin
            .resume()
            .on('uncaughtException', (err) => {
                const message = (err.getMessage)
                    ? err.getMessage()
                    : (err.stack || err);

                logger.error(message);
            });
    }

    _listener() {
        const server = this._server;

        logger.info('Server listening: %s://%s:%d', server.scheme, server.host, server.port);
    }
};
