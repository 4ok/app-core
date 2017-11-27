const defaultConfig = require('./default');

const DEFAULT_TOP_DOMAIN = 'ru';

module.exports = {

    // Environment
    env: 'production',

    // Domain
    domain: defaultConfig.projectName + '.' + DEFAULT_TOP_DOMAIN,
};
