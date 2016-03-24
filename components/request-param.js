'use strict';

module.exports = class {

    constructor(http) {
        this._request = http.request;
    }

    route(path) {
        return this._get('route.params.' + path);
    }

    query(path) {
        return this._get('query.' + path);
    }

    post(path) {
        return this._get('body.' + path);
    }

    _get(path) {
        return this._request.getParam(path);
    }
};
