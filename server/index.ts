import * as express from 'express';
import * as http from 'http'
import * as socketIo from 'socket.io'
import ExpressConfig from './config/express';
import RoutesConfig from './config/routes';
import SocketConfig from './config/socket'
import Mongo from './config/mongo';
import AuthService from './services/auth';
import UsersController from './controllers/user';
import RoomsController from './controllers/room';
import {config} from './config/config';

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
            roomInstance = new RoomsController(client.collection('rooms')),
            authInstance = new AuthService(client.collection('users')),
            routerConfig = new RoutesConfig(app, userInstance, roomInstance, authInstance),
            socketConfig = new SocketConfig(io, userInstance, roomInstance);

        app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));
    })
    .catch(err => console.log(err));