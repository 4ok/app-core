'use strict';

module.exports = class {

    constructor(http) {
        this._http = http;
        this._httpRequest = http.request;
    }

    get _request() {
        return this._httpRequest;
    }
};
