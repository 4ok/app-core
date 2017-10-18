const config = require('config');

module.exports = class {

    // eslint-disable-next-line class-methods-use-this
    get return() {
        return config;
    }
};
