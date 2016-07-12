const moment = require('moment');

module.exports = class {

    init(date) {
        return moment(date);
    }
};
