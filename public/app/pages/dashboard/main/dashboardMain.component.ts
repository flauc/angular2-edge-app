import {Component, OnDestroy, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {DataService} from '../../../common/services/data.service'
import {SocketControlService} from '../../../common/services/socket-control.service'
import {UserStoreService} from '../../../common/services/user-store.service'

@Component({
    selector: 'main',
    templateUrl: 'app/pages/dashboard/main/main.html'
})
export class DashboardMainComponent implements OnInit, OnDestroy {
    constructor(
        private _router: Router,
        private _data: DataService,
        private _socketControl: SocketControlService,
        private _userStore: UserStoreService
    ) {}

    public rooms;
    public me;
    
    // New Room
    public roomCreateToggle: boolean = false;
    public roomName: string;
    public roomDescription: string;

    private _userStoreListener: any;

    ngOnInit(): void {
        this.rooms = this._data.rooms;
        this._userStoreListener = this._userStore.emitter.subscribe(item => {
            if (item) this.me = item.data
        })
    }

    roomEnter(room): void {
        this._router.navigate([`/dashboard/room/${room.name}`])
    }

    roomCreate(): void {
        this._socketControl.roomCreate({name: this.roomName, description: this.roomDescription})
            .catch(err => console.log(err))
            .then(() => {
                this.roomName = '';
                this.roomDescription = '';
                this.roomCreateToggle = false;
            })
    }

    roomDelete(room) {
        this._socketControl.roomDelete(room)
            .catch(err => console.log(err))
    }

    ngOnDestroy(): void {
        this._userStoreListener.unsubscribe();
    }
}