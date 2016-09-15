import UsersController from '../controllers/user';
import RoomsController from '../controllers/room';
import AuthService from '../services/auth';
import {config} from './config';

export default class RoutesConfig {
    constructor(
        app,
        user: UsersController,
        room: RoomsController,
        public auth: AuthService
    ) {
        // Login
        app.post('/api/authorize', (req, res) => this._standardResponse(req, res, auth.generateToken(req.body)));

        // Users
        app.post('/api/sign-up', (req, res) => this._standardResponse(req, res, user.signUp(req.body)));
        app.get('/api/user', (req, res) => this._standardResponse(req, res, user.get()));

        // Get all Rooms
        app.get('/api/rooms', (req, res) => this._standardResponse(req, res, room.get()));

        // Catch API
        app.get('/api/*', (req, res) => res.sendStatus(404));

        // Catch route
        app.get('*', (req, res) => res.sendFile(`${config.rootPath}/public/index.html`));
    }

    private _standardResponse(req, res, fn: any): void {
        fn
            .then(data => res.json({success: true, data: data}))
            .catch(err => res.status(400).send({success: false, error: err}))
    }
}