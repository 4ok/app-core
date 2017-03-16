module.exports = class {

    constructor(projectDir, http, data) {
        this.__projectDir = projectDir;
        this.__http = http; // todo: request only
        this.__data = Object.freeze(data); // todo: deep freeze
    }

    get _projectDir() {
        return this.__projectDir;
    }

    get _request() {
        return this.__http.request;
    }

    get _data() {
        return this.__data;
    }
};
