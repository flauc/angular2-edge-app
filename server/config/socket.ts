import UsersController from '../controllers/user';
import RoomsController from '../controllers/room';
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
    message: 'message',
    leave: 'leave'
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
                        this.leave(socket);

                        return this._user.get()
                    })
                    .then(data => {
                        data.map(a => a['status'] = this.connections.find(b => a._id.toString() === b._id) ? 'online' : 'offline');
                        fn(this._standardResponse(true, {users: data}));
                    })
                    .catch(err => fn(this._standardResponse(false, 'Authentication failed')));
            })
        })
    }

    connections: any[] = [];

    room(socket) {
        socket.on(phrases.room.create, (data, fn) => {
            this._room.create(data)
                .then(data => {
                    fn(this._standardResponse(true, data));
                    socket.broadcast.emit(phrases.room.create, data)
                })
                .catch(err => fn(this._standardResponse(false, err)))
        });

        socket.on(phrases.room.delete, (data, fn) => {
            this._room.delete(data)
                .then(data => {
                    fn(this._standardResponse(true, data));
                    socket.broadcast.emit(phrases.room.delete, data);
                })
                .catch(err => fn(this._standardResponse(false, err)))
        })
    }

    task(socket) {
        socket.on(phrases.task.create, (data, fn) => {
            this._room.addTask(data)
                .then(data => {
                    fn(this._standardResponse(true, data));
                    socket.broadcast.emit(phrases.task.create, data);
                })
                .catch(err => fn(this._standardResponse(false, err)))
        });

        socket.on(phrases.task.update, (data, fn) => {
            this._room.editTask(data)
                .then(data => {
                    fn(this._standardResponse(true, data));
                    socket.broadcast.emit(phrases.task.update, data);
                })
                .catch(err => fn(this._standardResponse(false, err)))
        });

        socket.on(phrases.task.delete, (data, fn) => {
            this._room.removeTask(data)
                .then(data => {
                    fn(this._standardResponse(true, data));
                    socket.broadcast.emit(phrases.task.delete, data);
                })
                .catch(err => fn(this._standardResponse(false, err)))
        })
    }

    chat(socket) {
        socket.on(phrases.message, (data, fn) => {
            socket.broadcast.emit(phrases.message, {createdBy: this.connections.find(a => a.socket === socket)._id, message: data});
            fn(this._standardResponse(true, {createdBy: this.connections.find(a => a.socket === socket)._id, message: data}));
        })
    }

    leave(socket) { socket.on(phrases.leave, () => this._discUser(socket));}
    disconnect(socket) { socket.on('disconnect', () => this._discUser(socket));}

    private _discUser(socket) {
        const index = this.connections.findIndex(a => a.socket === socket);
        if (index) socket.broadcast.emit(phrases.status, {_id: this.connections[index]._id, status: 'offline'});
        this.connections.splice(index, 1);
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