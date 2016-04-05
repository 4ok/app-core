'use strict';

const Helper = require('../components/helper/abstract');

module.exports = class extends Helper {

    get(name) {
        return this._request.getParam(name);
    }

    getParam(name, def) {
        return this._request.getParam(name) || def; // TODO

        // return this.hasParam(name)
        //    ? this._getRequest().getParam(name)
        //    : def;
    }

    // hasParam: function (name) {
    //
    //    return this._getRequest().getParam(name);
    // }
};
