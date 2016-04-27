import {login} from './auth';
import {getUsers} from '../controllers/users.controller';
import {getRooms} from '../controllers/rooms.controller';

export default class RoutesConfig {
    constructor(app, config) {
        // Login
        app.post('/api/login', login);

        // Get all Users
        app.get('/api/users', getHelper(getUsers));

        // Get all Rooms
        app.get('/api/rooms', getHelper(getRooms));

        // Catch API
        app.all('/api/*', (req, res) => res.sendStatus(404));

        // Catch route
        app.get('*', (req, res) => res.sendFile(`${config.rootPath}/public/index.html`));
    }
}

function getHelper(funcToUse: Function, query?: string) {
    return (req, res) => {
        if (query) req.params[query] = req.params[query].replace('-', ' ');
        funcToUse(query ? {[query]: req.params[query]} : null)
            .catch(err => {
                res.status(401).send({
                    success: false,
                    error: err
                });
            })
            .then(data => {
                res.json({
                    success: true,
                    data: data
                });
            })

    }
}