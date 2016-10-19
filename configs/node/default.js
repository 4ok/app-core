const path = require('path');

module.exports = {

    // Root project path
    rootPath : path.resolve('./'),

    // Environment
    env : 'development',

    // Server
    server : {
        scheme : 'http',
        host : '127.0.0.1',
        port : 3000,
    },

    // Databases
    db : {
        mongo : { // TODO to types
            host : '127.0.0.1',
            port : '27017',
        },
    },

    // Session
    session : { // TODO options
        options : {
            secret : '82MXFYNYHMEpSv8W',
            resave : true,
            saveUninitialized : true,
        },
    },
};
