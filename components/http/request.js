'use strict';

const has = require('lodash.has');
const get = require('lodash.get');
const set = require('lodash.set');
const url = require('url');

module.exports = class {

    constructor(request) {
        this._request = request;
    }

    get url() {
        this._url = this._url || url.parse(this._request.url);

        return this._url;
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
