'use strict';

module.exports = class {

    constructor(requestParam) {
        this._requestParam = requestParam;
    }

    get param() {
        return this._requestParam;
    }
}
