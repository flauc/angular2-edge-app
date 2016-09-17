import {Injectable} from '@angular/core'
import {ApiService} from './api.service'
import {Subject, BehaviorSubject} from 'rxjs/Rx';
import {Room} from '../interfaces/room.interface';
import {User} from '../interfaces/user.interface';

/*
    This service handles getting data that the application requires from the server
    via HTTP requests through the ApiService
 */
@Injectable()
export class DataService {
    constructor(
        private _api: ApiService
    ) {}

    public rooms: Subject<Room[]> = new BehaviorSubject([]);
    public users: Subject<User[]> = new BehaviorSubject([]);

    private _rooms: Room[];
    private _users: User[];

    loadRooms(rooms: Room[]) {
        this.rooms.next(rooms);
        this._rooms = rooms;
    }

    loadUsers(users: User[]) {
        this.users.next(users);
        this._users = users;
        this._rooms.forEach(a => a.createdBy = this._users.find(b => b._id === a.createdBy));
        this.rooms.next(this._rooms);
    }

    addRoom(room: Room) {
        console.log(room);
        this._rooms.push(Object.assign(room, {createdBy: this._users.find(a => a._id === room.createdBy)}));
        this.rooms.next(this._rooms);
    }

    removeRoom(data: {_id: string}) {
        const index = this._rooms.findIndex(a => a._id === data._id);
        this._rooms.splice(index, 1);
        this.rooms.next(this._rooms);
    }
}