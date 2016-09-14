import * as express from 'express';
import * as http from 'http'
import * as socketIo from 'socket.io'
import {config} from './config/values.const';
import ExpressConfig from './config/express';
import RoutesConfig from './config/routes';
import SocketConfig from './config/socket'
import Mongo from './config/mongo';
import UsersController from './controllers/users';
import AuthService from './services/auth';

const app = express(),
    server = http.Server(app),
    io = socketIo(server),
    // Config
    expressConfig = new ExpressConfig(app);


// Open connection to mongo
Mongo.init()
    .then(client => {

        // Mongo dependent config
        const userInstance = new UsersController(client.collection('users')),
            authInstance = new AuthService(client.collection('users')),
            routerConfig = new RoutesConfig(app, userInstance, authInstance);

        app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));
    })
    .catch(err => console.log(err));