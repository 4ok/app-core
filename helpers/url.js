const qs = require('qs');
const Helper = require('../components/helper/abstract');

const BASE_URL = Object.freeze({
    libs: 'https://cdnjs.cloudflare.com/ajax/libs',
    fonts: 'https://fonts.googleapis.com/css?family=',
});

module.exports = class extends Helper {

    get full() {
        return this._request.fullUrl;
    }

    get parsed() {
        return this._request.parsedUrl;
    }

    // eslint-disable-next-line class-methods-use-this
    getLib(name, tech) {
        return `${BASE_URL.libs}/${name}.min.${tech}`;
    }

    // eslint-disable-next-line class-methods-use-this
    getFont(name, mods) {
        name = encodeURIComponent(name);
        mods = mods.join(',');

        return `${BASE_URL.fonts}${name}:${mods}`;
    }

    // eslint-disable-next-line class-methods-use-this
    getPageResources({ commonResources = [], pagesResources = {}, page }) {
        const pageResources = [].concat(commonResources, pagesResources[page] || []);

        return pageResources.reduce((result, resource) => {
            Object
                .keys(resource)
                .forEach((type) => {
                    result[type] = result[type].concat(resource[type]);
                });

            return result;
        }, {
            css: [],
            js: [],
        });
    }

    getMenuItems(items) {
        const currentUrl = this._getUrlWithoutSuffix(this._request.url.path);

        return items.map((item) => {
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

    getByRoute(name, params) {
        const route = this._request
            .getParam('route')
            .getByName(name);

        if (!route) {
            throw new Error(`Route "${name}" not found`);
        }

        return route.build(params);
    }

    // eslint-disable-next-line class-methods-use-this
    getQueryString(params) {
        return (params)
            ? '?' + qs.stringify(params)
            : '';
    }

    // eslint-disable-next-line class-methods-use-this
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
};
