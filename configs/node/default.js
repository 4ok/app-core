const path = require('path');

const projectDir = path.resolve('./');
const projectName = process.env.PROJECT_NAME;

module.exports = {

    // Project name
    projectName,

    // Project directory
    rootPath: projectDir, // todo: rootPath rename to projectDir

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
