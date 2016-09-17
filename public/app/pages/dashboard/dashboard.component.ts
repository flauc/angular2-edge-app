import {Component, OnInit} from '@angular/core';
import {DataService} from '../../common/services/data.service';
import {Observable} from 'rxjs';
import {Room} from '../../common/interfaces/room.interface';
import {UserStoreService} from '../../common/services/user-store.service';
import {Router} from '@angular/router';
import {User} from '../../../../server/interfaces/user/user';
import {SocketControlService} from '../../common/services/socket-control.service';

@Component({
    moduleId: module.id,
    selector: 'edge-dashboard',
    templateUrl: 'dashboard.html',
})

export class DashboardComponent implements OnInit {
    constructor(
        private _router: Router,
        private _data: DataService,
        private _socket: SocketControlService,
        private _userStore: UserStoreService
    ) { }

    public me: User;
    public rooms: Observable<Room[]>;
    public chatOpen: boolean = false;

    // Room creation
    public room = {
        name: '',
        description: ''
    };

    ngOnInit() {
        this.rooms = this._data.rooms;
        this.me = this._userStore.getUser().user;
    }

    toggleChat(): void {

    }

    createRoom(): void {
        this._socket.createRoom(this.room);
        this.room.name = '';
        this.room.description = '';
    }

    logOut(): void {
        this._userStore.setUser();
        this._router.navigate(['/login'])
    }
}