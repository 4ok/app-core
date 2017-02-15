const qs = require('qs');
const Helper = require('../components/helper/abstract');

const env = process.env.NODE_ENV || 'development';
const isDev = (env === 'development');

const BASE_URL = Object.freeze({
    libs : 'https://cdnjs.cloudflare.com/ajax/libs',
    fonts : 'https://fonts.googleapis.com/css?family=',
});

module.exports = class extends Helper {

    getLib(name, tech) {
        return `${BASE_URL.libs}/${name}.min.${tech}`;
    }

    getFont(name, mods) {
        name = encodeURIComponent(name);
        mods = mods.join(',');

        return `${BASE_URL.fonts}${name}:${mods}`;
    }

    getMenuItems(items) {
        const currentUrl = this._getUrlWithoutSuffix(this._request.url.path);

        return items.map(item => {
            const itemUrl = this._getUrlWithoutSuffix(item.url);

            if (itemUrl === currentUrl) {
                item.state = 'active';
            } else if (itemUrl !== '/' && currentUrl.indexOf(itemUrl) === 0) {
                item.state = 'active-child';
            }

            if (item.children) {
                item.children = this.getMenuItems(item.children);
            }

            return item;
        });
    }

    _getUrlWithoutSuffix(url) {

        if (url.indexOf('.') > 0) {
            url = url
                .split('.')
                .slice(0, -1)
                .concat('')
                .join('/');
        }

        return url;
    }

    getByRoute(name, params) {
        const route = this._request
            .getParam('route')
            .getByName(name);

        if (!route) {
            throw new Error(`Route "${name}" not found`);
        }

        return route.build(params);
    }

    getQueryString(params) {
        return (params)
            ? '?' + qs.stringify(params)
            : '';
    }
};
