const defaultConfig = require('./default');
const server = defaultConfig.server;

module.exports = {

    // Environment
    env : 'development',

    // domain
    domain : server.host + ':' + server.port,
};
