import {Component, OnInit} from '@angular/core';
import {DataService} from '../../common/services/data.service';
import {Observable} from 'rxjs';
import {Room} from '../../common/interfaces/room.interface';
import {UserStoreService} from '../../common/services/user-store.service';
import {Router} from '@angular/router';
import {User} from '../../../../server/interfaces/user/user';
import {SocketControlService} from '../../common/services/socket-control.service';
import {FormGroup} from '@angular/forms';

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

    // Trick for reseting the form
    public formActive: boolean = true;
    // Form modal
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
        this._socket.createRoom(Object.assign(this.room, {createdBy: this.me._id}));
        this.formActive = false;
        setTimeout(() => this.formActive = true, 0);
        this.room.name = '';
        this.room.description = '';
    }

    deleteRoom(id: string) {
        this._socket.deleteRoom(id);
    }

    logOut(): void {
        this._userStore.setUser();
        this._socket.disconnect();
        this._router.navigate(['/login'])
    }
}