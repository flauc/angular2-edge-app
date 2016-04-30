import {Component} from 'angular2/core';
import {DataService} from '../../../common/services/data.service';

@Component({
    selector: 'main',
    templateUrl: 'app/pages/dashboard/main/main.html'
})
export class DashboardMainComponent {
    constructor(
        private _data: DataService
    ) {
        this.rooms = _data.rooms;
        this.users = _data.users;
    }

    public rooms;
    public users;
}