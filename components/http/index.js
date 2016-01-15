'use strict';

var Request  = require('./request.js');
var Response = require('./response.js');

module.exports = class {

    constructor(request, response) {
        this._request  = new Request(request);
        this._response = new Response(response);
    }

    get request() {
        return this._request;
    }

    get response() {
        return this._response;
    }
};
