const Helper = require('../components/helper/abstract');
const RequestParam = require('../components/request-param');

module.exports = class extends Helper {

    constructor(...args) {
        super(...args);
        this._requestParam = new RequestParam(this._request);
    }

    get routeName() {
        return this._request.getParam('route.name');
    }

    get param() {
        return this._requestParam;
    }
};
