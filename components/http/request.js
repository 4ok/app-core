'use strict';

var has = require('lodash.has');
var get = require('lodash.get');
var set = require('lodash.set');

module.exports = class {

    constructor(request) {
        this._request = request;
    }

    get url() {
        return this._request.url;
    }

    hasParam(path) {
        return has(this._request, path);
    }

    getParam(path, def) {

        return (this.hasParam(path))
            ? get(this._request, path)
            : def;
    }

    setParam(path, value) {
        set(this._request, path, value);
    }
};
