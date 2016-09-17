import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataService} from '../../common/services/data.service';
import {Observable} from 'rxjs';
import {Room} from '../../common/interfaces/room.interface';
import {UserStoreService} from '../../common/services/user-store.service';
import {Router} from '@angular/router';
import {User} from '../../../../server/interfaces/user/user';
import {SocketControlService} from '../../common/services/socket-control.service';
import {FormGroup} from '@angular/forms';
import {Message} from '../../common/interfaces/message.interface';

@Component({
    moduleId: module.id,
    selector: 'edge-dashboard',
    templateUrl: 'dashboard.html',
})

export class DashboardComponent implements OnInit, OnDestroy {
    constructor(
        private _router: Router,
        private _data: DataService,
        private _socket: SocketControlService,
        private _userStore: UserStoreService
    ) { }

    public me: User;
    public rooms: Observable<Room[]>;
    public chatOpen: boolean = false;

    public messages: Message[] = [];

    // Room creation

    // Trick for reseting the form
    public formActive: boolean = true;
    // Form modal
    public room = {
        name: '',
        description: ''
    };

    private _msgListener: any;

    ngOnInit() {
        this.rooms = this._data.rooms;
        this.me = this._userStore.getUser().user;

        // We listen for new messages from the DataService
        this._msgListener = this._data.message.subscribe(a => this.messages.push(a))
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

    deleteTask(taskId: string, roomId: string) {

    }

    completeTask(taskId: string, roomId: string) {

    }

    logOut(): void {
        this._userStore.setUser();
        this._socket.disconnect();
        this._router.navigate(['/login'])
    }

    ngOnDestroy() {
        // When the component is destroyed we make sure to unsubscribe our message listener
        if (this._msgListener) this._msgListener.unsubscribe();
    }
}