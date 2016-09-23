const Gate = require('app-gate');

module.exports = class {

    constructor() {
        this._gate = new Gate();
    }

    callMethod() {
        return this._gate.callMethod.apply(this._gate, arguments);
    }
};
