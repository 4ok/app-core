'use strict';

module.exports = class {

    constructor(http, helpersDirs) {
        this._http = http;
        this._helpersDirs = helpersDirs;
        this._helpers = {};
    }

    getHelper(name) { // TODO: cache instances

        if (!this._helpers[name]) {

            for (const dir of this._helpersDirs) {
                let helperPath;

                try {
                    helperPath = require.resolve(dir + '/' + name);
                } catch (e) {
                    // Do nothing
                }

                if (helperPath) {
                    const Helper = require(helperPath);

                    this._helpers[name] = new Helper(this._http);
                    break;
                }
            }
        }

        if (!this._helpers[name]) {
            throw new Error('Helper "' + name + '" not found');
        }

        return this._helpers[name];
    }
};
