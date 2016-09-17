import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {DataService} from './data.service'
import {UserStoreService} from './user-store.service'
import {socketValues} from '../config/socket.values';
import {appValues} from '../config/app.values';
import {Room} from '../interfaces/room.interface';

declare const io: any;

/*
    This service handles all socket communication with the server
 */
@Injectable()
export class SocketControlService {
    constructor(
        private _router: Router,
        private _userStore: UserStoreService,
        private _data: DataService
    ) {
        // Open the connection with the server
        this.socket = io.connect(appValues.base);
    };

    public socket;

    // Send the validate request to the server
    validate() {
        return new Promise((resolve, reject) => {
            this.socket.emit(socketValues.validate, this._userStore.getUser().token, info => {
                if (info.success) {
                    this._data.loadUsers(info.data.users);
                    this._openListeners();
                    return resolve(true);
                }

                return reject(false);
            });
        })
    }

    createRoom(room: Room) {
        this.socket.emit(socketValues.room.create, room, (res) => {
            if (res.success) this._data.addRoom(res.data)
        })
    }

    private _openListeners() {
        this.socket.on(socketValues.room.create, (data) => this._data.addRoom(data));
        this.socket.on(socketValues.room.delete, data => this._data.removeRoom(data))
    }

    // changeStatus(username, status) {
    //     this._data.users.forEach(a => {
    //         if (a.username === username) a.status = status
    //     });
    // }
    //
    // // Room Methods
    // roomCreate(data) {
    //     return new Promise((resolve, reject) => {
    //         this.socket.emit('server', {command: this.sv.roomCreate, data: data}, val => {
    //             if (val.success) {
    //                 this._data.rooms.push(val.data);
    //                 resolve(val);
    //             }
    //
    //             else reject(val)
    //         })
    //     });
    // }
    //
    // roomDelete(data) {
    //     return new Promise((resolve, reject) => {
    //         this.socket.emit('server', {command: this.sv.roomDelete, data: data}, val => {
    //             if (val.success) {
    //                 this._data.rooms.splice(this._data.rooms.indexOf(data), 1);
    //                 resolve(val);
    //             }
    //
    //             else reject(val)
    //         })
    //     })
    // }
    //
    // // Task Methods
    // taskCreate(data) {
    //     return new Promise((resolve, reject) => {
    //         this.socket.emit('server', {command: this.sv.taskCreate, data: {roomName: data.roomName, name: data.name}}, val => {
    //             if (val.success) {
    //                 let index = _.findIndex(this._data.rooms, o => o.name === data.roomName);
    //                 if (index !== -1) this._data.rooms[index].tasks.push(val.data);
    //                 resolve(val)
    //             }
    //
    //             else reject(val)
    //         })
    //     })
    // }
    //
    // taskUpdate(data) {
    //     return new Promise((resolve, reject) => {
    //         this.socket.emit('server', {command: this.sv.taskUpdate, data: data}, val => {
    //             if (val.success) {
    //                 let index = _.findIndex(this._data.rooms, o => o.name === data.roomName),
    //                     taskIndex = _.findIndex(this._data.rooms[index].tasks, o => o._id === val.data._id);
    //                 this._data.rooms[index].tasks[taskIndex] = val.data;
    //             }
    //
    //             else reject(val)
    //         })
    //     })
    // }
    //
    // taskDelete(data) {
    //     return new Promise((resolve, reject) => {
    //         this.socket.emit('server', {command: this.sv.taskDelete, data: data}, val => {
    //             if (val.success) {
    //
    //                 let index = _.findIndex(this._data.rooms, o => o.name === data.roomName),
    //                     taskIndex = _.findIndex(this._data.rooms[index].tasks, o => o._id === val.data);
    //
    //                 this._data.rooms[index].tasks.splice(taskIndex, 1);
    //             }
    //
    //             else reject(val)
    //         })
    //     })
    // }

    // Disconnect the socket
    disconnect() {
        this.socket.disconnect();
    }

}