import {Component} from 'angular2/core';
import {RoomsDataService} from '../../../common/services/roomsData.service';
import {RouteParams, Router} from 'angular2/router';

@Component({
    selector: 'room',
    templateUrl: './public/app/pages/dashboard/room/room'
})
export class RoomComponent {
    constructor(
        private _router: Router,
        private _params: RouteParams,
        private _roomsData: RoomsDataService
    ) {

        // Check if we are in a room that exists 
        let currentRoom = _roomsData.rooms.find(a => a.name === _params.get('roomName'));
        if (currentRoom) this.room = currentRoom;
        else _router.navigate(['DashboardMain']);
    }

    public room;
}