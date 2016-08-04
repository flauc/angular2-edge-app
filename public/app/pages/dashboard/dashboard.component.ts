import {Component, OnInit} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router'
import {DataService} from '../../common/services/data.service'
import {SocketControlService} from '../../common/services/socket-control.service'
import {UserBlockComponent} from '../../common/components/user-block/user-block.component'

@Component({
    selector: 'user',
    templateUrl: 'app/pages/dashboard/dashboard.html',
    providers: [SocketControlService],
    directives: [
        ROUTER_DIRECTIVES,
        UserBlockComponent
    ]
})

export class DashboardComponent implements OnInit {
    constructor(
        private _socketControl: SocketControlService,
        private _data: DataService
    ) {}

    public users;
    
    // TODO Move this back to canActivate when it gets implemented
    ngOnInit(): void {
        this._data.getAllData()
            .then(res => {
                // Validate the socket connection and start listening to client emits
                this._socketControl.validateAndOpenListeners();
                this.users = this._data.users;
            })
    }
}