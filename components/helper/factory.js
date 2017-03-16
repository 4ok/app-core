module.exports = class {

    constructor(projectDir, helpersDirs, http, data) {
        this._projectDir = projectDir;
        this._helpersDirs = helpersDirs;
        this._http = http;
        this._data = data;
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
                    // eslint-disable-next-line global-require
                    const Helper = require(helperPath);
                    const helper = new Helper(this._projectDir, this._http, this._data);;

                    this._helpers[name] = helper._return || helper;

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
