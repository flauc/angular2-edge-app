import {Component} from 'angular2/core';
import {DataService} from '../../../common/services/data.service';
import {SocketControlService} from '../../../common/services/socketControl.service';
import {Router} from 'angular2/router';
import {UserStoreService} from '../../../common/services/userStore.service';

@Component({
    selector: 'main',
    templateUrl: 'app/pages/dashboard/main/main.html'
})
export class DashboardMainComponent {
    constructor(
        private _router: Router,
        private _data: DataService,
        private _socketControl: SocketControlService,
        private _userStore: UserStoreService
    ) {
        this.rooms = _data.rooms;
        this.me = _userStore.getUser().data;
    }

    public rooms;
    public me;
    
    // New Room
    public roomCreateToggle: boolean = false;
    public roomName: string;
    public roomDescription: string;
    

    roomEnter(room) {
        this._router.navigate(['Room', {name: room.name}])
    }

    roomCreate() {
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
}