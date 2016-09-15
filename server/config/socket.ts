import UsersController from '../controllers/user';
import RoomsController from '../controllers/room';
import AuthService from '../services/auth';
import {jwtVerifyPromise} from '../services/auth';
const phrases = {
    validate: 'validate',
    status: 'status',
    room: {
        create: 'roomCreate',
        delete: 'roomDelete'
    },
    task: {
        create: 'taskCreate',
        update: 'taskUpdate',
        delete: 'taskDelete'
    },
    message: 'message'

};

export default class SocketConfig {
    constructor(
        private _io: any,
        private _user: UsersController,
        private _room: RoomsController
    ) {
        this._io.on('connection', (socket) => {
            socket.on(phrases.validate, (token, fn) => {

                this.disconnect(socket);

                jwtVerifyPromise(token)
                    .then(data => {
                        this.connections.push({_id: data._id, socket: socket});
                        socket.broadcast.emit(phrases.status, {_id: data._id, status: 'online'});

                        this.room(socket);
                        this.task(socket);
                        this.chat(socket);

                        return this._user.get()
                    })
                    .then(data => {
                        data.map(a => a['status'] = this.connections.find(b => a._id === b._id) ? 'online' : 'offline');
                        fn(this._standardResponse(true, {users: data}));
                    })
                    .catch(err => fn(this._standardResponse(false, 'Authentication failed')));
            })
        })
    }

    connections: any[] = [];

    room(socker) {
        socker.on(phrases.room.create, (data) => {
            this._room.create(data)
                .then(data => this._standardResponse(true, data))
                .catch(err => this._standardResponse(false, err))
        });

        socker.on(phrases.room.delete, (data) => {
            this._room.delete(data)
                .then(data => this._standardResponse(true))
                .catch(err => this._standardResponse(false, err))
        })
    }

    task(socket) {
        socket.on(phrases.task.create, (data) => {
            this._room.addTask(data)
                .then(data => this._standardResponse(true, data))
                .catch(err => this._standardResponse(false, err))
        });

        socket.on(phrases.task.update, (data) => {
            this._room.editTask(data)
                .then(data => this._standardResponse(true, data))
                .catch(err => this._standardResponse(false, err))
        });

        socket.on(phrases.task.delete, (data) => {
            this._room.removeTask(data)
                .then(data => this._standardResponse(true, data))
                .catch(err => this._standardResponse(false, err))
        })
    }

    chat(socket) {
        socket.on(phrases.message, (data) => {
            socket.broadcast.emit(phrases.message, {_id: this.connections.find(a => a.socket === socket)._id, message: data})
        })
    }

    disconnect(socket) {
        socket.on('disconnect', () => {
            let id = this.connections.find(a => a.socket === socket);

            if (id) socket.broadcast.emit(phrases.status, {_id: id, status: 'offline'})
        });
    }

    private _standardResponse(success: boolean, data?: any) {
        let toReturn = {success: success};

        if (data) {
            if (success) toReturn['data'] = data;
            else toReturn['error'] = data;
        }

        return toReturn;
    }
}