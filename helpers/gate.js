'use strict';

const Gate = require('app-gate');
const Helper = require('../components/helper/abstract');

module.exports = class extends Helper {

    constructor(http) {
        super(http);
        this._gate = new Gate();
    }

    callMethod() {
        return this._gate.callMethod.apply(this._gate, arguments);
    }
};
