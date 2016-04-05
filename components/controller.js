'use strict';

const logger = require('logger')();
const ReqestParam = require('./request-param');

module.exports = class {

    constructor(http) {
        this._httpField = http;
    }

    get _http() {
        return this._httpField;
    }

    get _param() {
        return new ReqestParam(this._http);
    }

    get _request() {
        return this._http.request;
    }

    get _response() {
        return this._http.response;
    }

    _onError(result) {
        if (typeof result === 'object' && result.constructor.name === 'BreakPromise') {
            const type = result.getType();
            let message = result.getMessage();

            if (!Array.isArray(message)) {
                message = [message];
            }

            if (result.hasMessage()) {
                logger[type].apply(logger, message);
            }
        } else {
            throw result;
        }
    }
};
