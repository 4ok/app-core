const has = require('lodash.has');
const get = require('lodash.get');
const set = require('lodash.set');
const url = require('url');

module.exports = class {

    constructor(request) {
        this._request = request;

        this._fullUrl = [
            'http://', // todo: for https
            request.headers.host,
            request.originalUrl,
        ].join('');
    }

    get fullUrl() {
        return this._fullUrl;
    }

    get parsedUrl() {

        if (!this._parsedUrl) {
            this._parsedUrl = url.parse(this._fullUrl);
        }

        return this._parsedUrl;
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
