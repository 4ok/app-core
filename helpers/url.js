'use strict';

const qs = require('qs');
const Helper = require('../components/helper/abstract');

const env = process.env.NODE_ENV || 'development';
const isDev = (env === 'development');

module.exports = class extends Helper {

    getLib(name, version, tech) {
        return [
            '//cdnjs.cloudflare.com/ajax/libs/',
            name,
            version,
            name + '.min.' + tech,
        ].join('/');
    }

    getBundleFile(tech) {
        const pathProlog = (isDev) ? '' : '../..';
        const bundle = 'index';

        return [
            pathProlog,
            'bundles',
            bundle,
            bundle + '.final.' + tech,
        ].join('/');
    }

    getMenu(menu) {
        menu.items = this._getMenuItems(menu.items);

        return menu;
    }

    _getMenuItems(items) {
        const currentUrl = this._getUrlWithoutSuffix(this._request.url.path);

        return items.map(item => {
            const route = item.route || {
                name : item.type,
                params : {
                    article_alias_chain : item.path,
                },
            };

            item.url = this.getByRoute(route.name, route.params);
            const itemUrl = this._getUrlWithoutSuffix(item.url);

            if (itemUrl === currentUrl) {
                item.state = 'active';
            } else if (itemUrl !== '/' && currentUrl.indexOf(itemUrl + '/') === 0) {
                item.state = 'active-child';
            }

            if (item.children) {
                item.children = this._getMenuItems(item.children);
            }

            return item;
        });
    }

    _getUrlWithoutSuffix(url) {
        return (url.indexOf('.') > 0)
            ? url
                .split('.')
                .slice(0, -1)
                .join('/')
            : url;
    }

    getByRoute(name, params) {
        const route = this._request
            .getParam('route')
            .getByName(name);

        return route.build(params);
    }

    getQueryString(params) {
        return (params)
            ? '?' + qs.stringify(params)
            : '';
    }
};
