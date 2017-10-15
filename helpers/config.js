const config = require('config');

module.exports = class {

    get return() {
        return config;
    }
};
