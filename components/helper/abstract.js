module.exports = class {

    constructor(http, data) {
        this._http = http;
        this._data = data;
    }

    get _request() {
        return this._http.request;
    }
};
