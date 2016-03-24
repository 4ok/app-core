'use strict';

const Helper          = require('app-core/components/helper/abstract');
const markdownBemjson = require('markdown-bemjson')();
const string          = require('underscore.string');

// TODO
const bundleDir = '/Users/lipolyakov/development/projects/trusha/application/bem/bundles/index';
const bemhtml = require(bundleDir + '/index.bemhtml.final.js').BEMHTML;

module.exports = class extends Helper {

    markdownToBemjson(markdown) {
        return markdownBemjson.convert(markdown);
    }

    markdownToText(markdown, length) {
        const bemjson = this.markdownToBemjson(markdown);

        return this.bemjsonToText(bemjson, length);
    }
};
