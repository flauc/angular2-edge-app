import {Component} from 'angular2/core';
import {RoomsDataService} from '../../../common/services/roomsData.service';

@Component({
    selector: 'main',
    templateUrl: 'app/pages/dashboard/main/main'
})
export class DashboardMainComponent {
    constructor(
        private _roomsData: RoomsDataService
    ) {
        this.rooms = _roomsData.rooms;
        console.log(this.rooms);
    }

    public rooms;
}