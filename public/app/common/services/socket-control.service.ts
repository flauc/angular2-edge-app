import {Injectable, EventEmitter} from '@angular/core'
import {Router} from '@angular/router'
import {socketValues} from '../config/app.values'
import {DataService} from './data.service'
import {UserStoreService} from './user-store.service'
import * as _ from 'lodash'

declare var io: any;

@Injectable()
export class SocketControlService {
    constructor(
        private _router: Router,
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
        this.socket.emit('validate', {token: this._userStore.getUser().token}, (info) => {

            if (info.success) {
                this.changeStatus(info.data.username, info.data.status);

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
                            this._data.rooms.push(value.data);
                            break;

                        // When a room is deleted
                        case 'roomDeleted':
                            this._data.rooms.splice(this._data.rooms.indexOf(value.data), 1);
                            break;

                        // When a task is created
                        case 'taskCreated':
                            let index = _.findIndex(this._data.rooms, o => o.name === value.toRoom);
                            if (index !== -1) this._data.rooms[index].tasks.push(value.data);
                            break;

                        // When a task is updated
                        case 'taskUpdated':
                            let index = _.findIndex(this._data.rooms, o => o.name === value.toRoom),
                                taskIndex = _.findIndex(this._data.rooms[index].tasks, o => o._id === value.data._id);
                            this._data.rooms[index].tasks[taskIndex] = value.data;
                            break;

                        // When a task i deleted
                        case 'taskDeleted':
                            let index = _.findIndex(this._data.rooms, o => o.name === value.toRoom),
                                taskIndex = _.findIndex(this._data.rooms[index].tasks, o => o._id === value.data);
                            this._data.rooms[index].tasks.splice(taskIndex, 1);
                            break;

                    }
                })
            }

            // If there was an error that means there is something wrong with the token
            else {
                this._userStore.setUser();
                this._router.navigate(['Login'])
            }
        });
    }

    changeStatus(username, status) {
        this._data.users.forEach(a => {
            if (a.username === username) a.status = status
        });
    }

    // Room Methods
    roomCreate(data) {
        return new Promise((resolve, reject) => {
            this.socket.emit('server', {command: this.sv.roomCreate, data: data}, val => {
                if (val.success) {
                    this._data.rooms.push(val.data);
                    resolve(val);
                }

                else reject(val)
            }) 
        });
    }
    
    roomDelete(data) {
        return new Promise((resolve, reject) => {
            this.socket.emit('server', {command: this.sv.roomDelete, data: data}, val => {
                if (val.success) {
                    this._data.rooms.splice(this._data.rooms.indexOf(data), 1);
                    resolve(val);
                }

                else reject(val)
            })
        })
    }

    // Task Methods
    taskCreate(data) {
        return new Promise((resolve, reject) => {
            this.socket.emit('server', {command: this.sv.taskCreate, data: {roomName: data.roomName, name: data.name}}, val => {
                if (val.success) {
                    let index = _.findIndex(this._data.rooms, o => o.name === data.roomName);
                    if (index !== -1) this._data.rooms[index].tasks.push(val.data);
                    resolve(val)
                }

                else reject(val)
            })
        })
    }

    taskUpdate(data) {
        return new Promise((resolve, reject) => {
            this.socket.emit('server', {command: this.sv.taskUpdate, data: data}, val => {
                if (val.success) {
                    let index = _.findIndex(this._data.rooms, o => o.name === data.roomName),
                        taskIndex = _.findIndex(this._data.rooms[index].tasks, o => o._id === val.data._id);
                    this._data.rooms[index].tasks[taskIndex] = val.data;
                }

                else reject(val)
            })
        })
    }

    taskDelete(data) {
        return new Promise((resolve, reject) => {
            this.socket.emit('server', {command: this.sv.taskDelete, data: data}, val => {
                if (val.success) {

                    let index = _.findIndex(this._data.rooms, o => o.name === data.roomName),
                        taskIndex = _.findIndex(this._data.rooms[index].tasks, o => o._id === val.data);

                    this._data.rooms[index].tasks.splice(taskIndex, 1);
                }

                else reject(val)
            })
        })
    }

    // Disconnect the socket
    disconnect() {
        this.socket.disconnect();
    }

}