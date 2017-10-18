const fs = require('fs');

const Helper = require('../components/helper/abstract');

module.exports = class extends Helper {

    constructor(...args) {
        super(...args);

        this._setReturnData();
    }

    _setReturnData() {
        const dataDir = this._projectDir + '/app/data';
        const filesNames = fs.readdirSync(dataDir);

        this._returnData = filesNames.reduce((result, fileName) => {
            const filePath = dataDir + '/' + fileName;
            const key = fileName.replace(/\.[^.]+$/, '');

            // eslint-disable-next-line global-require, import/no-dynamic-require
            result[key] = require(filePath);

            return result;
        }, {});
    }

    get return() {
        return this._returnData;
    }
};
