'use strict';

module.exports = class {

    constructor(http, helpersDirs) {
        this._http = http;
        this._helpersDirs = helpersDirs;
    }

    getHelper(name) {
        var result;

        for (let dir of this._helpersDirs) {
            let helperPath;

            try {
                helperPath = require.resolve(dir + '/' + name + '.js');
            } catch (e) {}

            if (helperPath) {
                let Helper = require(helperPath);
                result = new Helper(this._http);
                break;
            }
        }

        if (!result) {
            throw new Error('Helper "' + name + '" not found');
        }

        return result;
    }
}
