const config = require('config');

module.exports = class {

    get _return() {
        return config;
    }
};
