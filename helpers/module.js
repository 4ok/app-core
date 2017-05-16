const Module = class {

    constructor() {
        this._libs = {};
    }

    get(moduleName) {

        if (!this._libs[moduleName]) {
            this._libs[moduleName] = require(moduleName);
        }

        return this._libs[moduleName];
    }
}

module.exports = class {

    constructor() {
        this._module = new Module();
    }

    get _return() {
        return this._module;
    }
};
