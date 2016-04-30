import {Injectable, EventEmitter} from 'angular2/core';
import {UserStoreService} from './userStore.service';
import {socketValues} from '../config/app.values';
import {DataService} from './data.service';

declare var io: any;

@Injectable()
export class SocketControlService {
    constructor(
        private _userStore: UserStoreService,
        private _data: DataService
    ) {
        this.sv = socketValues;

        // Open connection
        this.socket = io.connect(this.sv.url);
    };

    public socket;

    private sv: any;

    validateAndOpenListeners() {
        this.socket.emit('validate', {token: this._userStore.getUser().token}, (data) => {
            this.changeStatus(data.username, data.status);

            // Once the connection is valid start listening
            this.socket.on('client', (value) => {
                switch (value.command) {

                    // When a user connects or disconnects 
                    case 'userStatus':
                        this.changeStatus(value.data.username, value.data.status);
                        break;

                    // When a new user is created
                    case 'userCreated':
                        this._data.users.push(value.data);
                        break;

                    // When a new room is created
                    case 'roomCreated':
                        console.log('from general');
                        this._data.rooms.push(value.data);
                        break;
                }
            })
        });
    }

    changeStatus(username, status) {
        this._data.users.forEach(a => {
            if (a.username === username) a.status = status
        });
    }

    roomCreate(data) {
        return new Promise((resolve, reject) => {
            this.socket.emit('server', {command: this.sv.roomCreate, data: data}, val => {
                this._data.rooms.push(val.data);
                resolve(val);
            }) 
        });
    }

    // Disconnect the socket
    disconnect() {
        this.socket.disconnect();
    }

}