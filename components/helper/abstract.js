'use strict';

module.exports = class {

    constructor(http) {
        this._http = http;
        this._httpRequest = http.request;
    }

    get _request() {
        return this._httpRequest;
    }

    _getHelper(name) { // TODO
        const helperPath = '../../helpers/' + name;
        const Helper = require(helperPath);

        return new Helper(this._http);
    }
};
