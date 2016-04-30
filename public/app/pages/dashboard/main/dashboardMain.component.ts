import {Component} from 'angular2/core';
import {DataService} from '../../../common/services/data.service';
import {SocketControlService} from '../../../common/services/socketControl.service';
import {UserBlockComponent} from '../../../common/components/userBlock/userBlock.component';
import {Router} from 'angular2/router';

@Component({
    selector: 'main',
    directives: [UserBlockComponent],
    templateUrl: 'app/pages/dashboard/main/main.html'
})
export class DashboardMainComponent {
    constructor(
        private _router: Router,
        private _data: DataService,
        private _socketControl: SocketControlService
    ) {
        this.rooms = _data.rooms;
        this.users = _data.users;
    }

    public rooms;
    public users;
    
    // New Room
    public roomCreateToggle: boolean = false;
    public roomName: string;
    public roomDescription: string;
    

    roomEnter(room) {
        this._router.navigate(['Room', {name: room.name}])
    }

    roomCreate() {
        this._socketControl.roomCreate({name: this.roomName, description: this.roomDescription})
            .then(() => {
                this.roomName = '';
                this.roomDescription = '';
                this.roomCreateToggle = false;
            })
    }
}