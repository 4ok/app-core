const get = require('lodash.get');

module.exports = class {

    constructor(request) {
        this._request = request;
        this._setParams();
    }

    get(path) {
        let result;

        Object
            .keys(this._params)
            .some(key => {
                result = this._get(path, key);

                return result;
            });

        return result;
    }

    route(path) {
        return this._get(path, 'route');
    }

    query(path) {
        return this._get(path, 'query');
    }

    post(path) {
        return this._get(path, 'body');
    }

    _get(path, prolog) {

        if (prolog) {
            path = prolog + '.' + path;
        }

        return get(this._params, path);
    }

    _setParams() {
        const getParam = this._request.getParam.bind(this._request);

        this._params = {
            route : getParam('route.params'),
            query : getParam('query'),
            post : getParam('body'),
        };
    }
};
