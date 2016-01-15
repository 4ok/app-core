'use strict';

var Susanin = require('susanin');

const DEFAULT_PARAMS = {
    controller : 'index',
    action     : 'index'
};

class Router {

    constructor(routes) {
        this._susanin = Susanin();

        if (routes) {
            this.addRoute(routes);
        }
    }

    addRoute(routes) {
        [].concat(routes).map(this._addOneRoute, this);
    }

    findRoute(url) {
        var found = this._susanin.findFirst(url);
        var result;

        if (found) {
            var route       = found[0];
            var routeParams = found[1];
            var options     = route._options;

            result = {
                name      : route.getName(),
                pattern   : options.pattern.split('(')[0],
                params    : Object.assign({}, DEFAULT_PARAMS, route.getData(), routeParams),
                getByName : this._susanin.getRouteByName.bind(this._susanin)
            };
        }

        return result;
    }

    _addOneRoute(route) {
        this._susanin.addRoute(route);
    }
}

module.exports = Router;
