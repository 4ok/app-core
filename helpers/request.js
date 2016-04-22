'use strict';

const Helper = require('../components/helper/abstract');
const RequestParam = require('../components/request-param');

module.exports = class extends Helper {

    constructor(http) {
        super(http);
        this._requestParam = new RequestParam(http);
    }

    get routeName() {
        return this._request.getParam('route.name');
    }

    get param() {
        return this._requestParam;
    }
};
