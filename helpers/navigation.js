'use strict';

var config = require('config');
var Helper = require('../components/helper/abstract.js');

module.exports = class extends Helper {

    getUrlByRoute(name, params) {
        var route = this._getRequest().get('route').getByName(name);

        return route.build(params);
    }

    getPageUrl(url, params) {
        return this.getUrl(url, true) + this._getQueryString(params);
    }

    getUrl(url, isAddUrlPageSuffix) {

        if (Array.isArray(url)) {
            var root = '';

            if ('/' == url[0]) {
                root = '/';
                url = url.slice(1);
            }

            url = root + url.join('/');
        }

        if (isAddUrlPageSuffix) {
            var urlPageSuffix = config.page.urlSuffix;

            if (urlPageSuffix && '/' != url) {
                url += '.' + urlPageSuffix;
            }
        }

        return url;
    }

    _getQueryString(params) {
        var result = '';

        if (params) {
            var encode = encodeURIComponent;
            var queryString = Object.keys(params).map(function (key) {
                return encode(key) + '=' + encode(params[key])
            });

            result = '?' + queryString.join('&');
        }

        return result;
    }
};
