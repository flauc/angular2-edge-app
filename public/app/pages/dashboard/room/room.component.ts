import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {DataService} from '../../../common/services/data.service';

@Component({
    selector: 'room',
    templateUrl: './public/app/pages/dashboard/room/room'
})
export class RoomComponent {
    constructor(
        private _router: Router,
        private _params: RouteParams,
        private _data: DataService
    ) {

        // Check if we are in a room that exists 
        let currentRoom = _data.rooms.find(a => a.name === _params.get('roomName'));
        if (currentRoom) this.room = currentRoom;
        else _router.navigate(['DashboardMain']);
    }

    public room;
}