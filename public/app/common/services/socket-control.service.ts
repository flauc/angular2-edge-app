import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {DataService} from './data.service'
import {UserStoreService} from './user-store.service'
import {socketValues} from '../config/socket.values';
import {appValues} from '../config/app.values';
import {Room} from '../interfaces/room.interface';
import {Task} from '../interfaces/task.interface';

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
        this.socket.emit(socketValues.room.create, room, res => {
            if (res.success) this._data.addRoom(res.data)
        })
    }

    deleteRoom(id: string) {
        this.socket.emit(socketValues.room.delete, {_id: id}, res => {
            if (res.success) this._data.removeRoom(res.data.removed)
        })
    }

    createTask(roomId: string, task: Task) {
        this.socket.emit(socketValues.task.create, {roomId: roomId, task: task}, res => {
            if (res.success) this._data.createTask(res.data)
        })
    }

    updateTask(roomId: string, task: Task) {
        this.socket.emit(socketValues.task.update, {roomId: roomId, task: task}, res => {
            if (res.success) this._data.updateTask(res.data)
        })
    }

    deleteTask(roomId: string, taskId: string) {
        this.socket.emit(socketValues.task.delete, {roomId: roomId, taskId: taskId}, res => {
            if (res.success) this._data.deleteTask(res.data)
        })
    }

    newMessage(message: string) {
        this.socket.emit(socketValues.message, message, res => {
            if (res.success) this._data.newMessage(res.data)
        })
    }

    // Disconnect the socket
    disconnect() {
        this.socket.disconnect();
    }

    private _openListeners() {
        this.socket.on(socketValues.room.create, data => this._data.addRoom(data));
        this.socket.on(socketValues.room.delete, data => this._data.removeRoom(data.removed));
        this.socket.on(socketValues.task.create, data => this._data.createTask(data));
        this.socket.on(socketValues.task.update, data => this._data.updateTask(data));
        this.socket.on(socketValues.task.delete, data => this._data.deleteTask(data));
        this.socket.on(socketValues.message, data => this._data.newMessage(data));
    }
}