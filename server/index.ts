import * as express from 'express'
import * as http from 'http'
import * as socketIo from 'socket.io'
import {config} from './config/config'
import ExpressConfig from './config/express'
import RoutesConfig from './config/routes'
import SocketConfig from './config/socket'

const app = express(),
    server = http.Server(app),
    io = socketIo(server),

    // TODO: Find a better solution for handling this import and the export in the mongo.js file
    mongo = require('./config/mongo'),

    // Configuration classes
    expressConfig = new ExpressConfig(app, config),
    routesConfig = new RoutesConfig(app, config),
    socketConfig = new SocketConfig(io);

// Init the db
mongo.init(function (error) {
    if (error) console.log('db error: ', error);

    else {
        // Db open now init the server
        server.listen(config.port, () => {
            console.log(`Server listening on port ${config.port}`);
        });
    }
});
