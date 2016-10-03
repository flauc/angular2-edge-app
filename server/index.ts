import * as express from 'express';
import * as io from 'socket.io'
import ExpressConfig from './config/express';
import RoutesConfig from './config/routes';
import SocketConfig from './config/socket'
import Mongo from './config/mongo';
import AuthService from './services/auth';
import UsersController from './controllers/user';
import RoomsController from './controllers/room';
import {config} from './config/config';

// Open connection to mongo
Mongo.init()
    .then(client => {

        const app = express(),
            // Config
            expressConfig = new ExpressConfig(app),
            userInstance = new UsersController(client.collection('users')),
            roomInstance = new RoomsController(client.collection('rooms')),
            authInstance = new AuthService(client.collection('users')),
            routerConfig = new RoutesConfig(app, userInstance, roomInstance, authInstance),

            server = app.listen(config.port, () => {

                const socketConfig = new SocketConfig(io.listen(server), userInstance, roomInstance);

                console.log(`Server listening on port ${config.port}`)
            });
    })
    .catch(err => console.log(err));