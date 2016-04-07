module.exports = {

    // Environment
    env : 'development',
    isDevEnv : true,

    // Server
    server : {
        scheme : 'http',
        host : 'localhost',
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
            secret : 'development',
            resave : true,
            saveUninitialized : true,
        },
    },
};
