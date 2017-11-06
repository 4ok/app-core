const path = require('path');

const projectName = process.env.PROJECT_NAME;
const projectDir = path.resolve('./');

module.exports = {

    // Project name
    projectName,

    // Project directory
    projectDir,

    // Server
    server: {
        scheme: 'http',
        host: 'localhost',
        port: 3000,
    },

    // Databases
    db: {
        mongo: {
            db: projectName,
            host: 'localhost',
            port: '27017',
        },
    },
};
