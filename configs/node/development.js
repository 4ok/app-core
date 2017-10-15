const defaultConfig = require('./default');

const server = defaultConfig.server;

module.exports = {

    // Environment
    env : 'development',

    // Domain
    domain : server.host + ':' + server.port,
};
