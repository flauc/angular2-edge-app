import * as path from 'path'

const rootPath = path.normalize(`${__dirname}/../../`);

export const config = {
    appName: 'angular2-edge',
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'dev',
    domain: 'http://localhost',
    rootPath: rootPath,
    staticPath: path.normalize(`${rootPath}/public`),
    nodeModulesPath: path.normalize(`${rootPath}/node_modules`),
    appSecret: 'asdasd',

    // Mongo
    mongo: {
        server: '127.0.0.1',
        port: 27017
    },

};