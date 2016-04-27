import * as path from 'path'

let rootPath = path.normalize(`${__dirname}/../../`);

export const config = {
    appName: 'angular2-edge',
    port: process.env.PORT || 1000,
    env: process.env.NODE_ENV || 'dev',
    domain: 'http://localhost',
    rootPath: rootPath,
    staticPath: path.normalize(`${rootPath}/public`),
    appSecret: 'something very secret',

    // Mongo
    mongoServer: '127.0.0.1',
    mongoPort: 27017

};