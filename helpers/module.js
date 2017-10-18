const Module = class {

    constructor() {
        this._libs = {};
    }

    get(moduleName) {

        if (!this._libs[moduleName]) {
            // eslint-disable-next-line global-require, import/no-dynamic-require
            this._libs[moduleName] = require(moduleName);
        }

        return this._libs[moduleName];
    }
};

module.exports = class {

    constructor() {
        this._module = new Module();
    }

    get return() {
        return this._module;
    }
};
