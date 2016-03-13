'use strict';

const logger = require('logger')();
const Gate   = require('app-gate');
const Helper = require('../components/helper/abstract.js');

module.exports = class extends Helper {

    constructor(http) {
        super(http);
        this._gate = new Gate();
    }

    setCallbackWrapper(fn) {
        this._callbackWrapper = fn;
    }

    callMethod() {
        let result   = this._gate.callMethod.apply(this._gate, arguments);
        let callback = arguments[2];

        if (callback) {
            callback = callback.bind(callback);

            result = (this._callbackWrapper)
                ? this._callbackWrapper(() => result.then(callback))
                : callback;
        }

        return result;
    }
};
