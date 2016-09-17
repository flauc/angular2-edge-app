import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../common/services/data.service'
import {SocketControlService} from '../../../common/services/socket-control.service'

@Component({
    moduleId: module.id,
    selector: 'edge-room',
    templateUrl: 'room.html'
})
export class RoomComponent implements OnInit {
    constructor() {}

    public room;

    // Task Creation
    public taskName: string;

    ngOnInit(): void {

    }
}