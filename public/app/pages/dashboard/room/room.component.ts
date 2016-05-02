import {Component} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {DataService} from '../../../common/services/data.service';
import {UserBlockComponent} from '../../../common/components/userBlock/userBlock.component';
import {SocketControlService} from '../../../common/services/socketControl.service';

@Component({
    selector: 'room',
    directives: [UserBlockComponent],
    templateUrl: 'app/pages/dashboard/room/room.html'
})
export class RoomComponent {
    constructor(
        private _router: Router,
        private _params: RouteParams,
        private _data: DataService,
        private _socketControl: SocketControlService
    ) {

        // Check if we are in a room that exists 
        let currentRoom = _data.rooms.find(a => a.name === _params.get('name'));
        if (currentRoom) this.room = currentRoom;
        else _router.navigate(['DashboardMain']);

    }

    public room;
    
    // Task Creation
    public taskName: string;

    taskCreate() {
        this._socketControl.taskCreate({roomName: this.room.name, name: this.taskName})
            .catch(err => {})
            .then(() => {
                this.taskName = '';
            })
    }

    taskComplete(task) {
        this._socketControl.taskUpdate({roomName: this.room.name, task: {complete: !task.complete, _id: task._id}})
            .catch(err => {})
    }

    taskDelete(taskId) {
        this._socketControl.taskDelete({roomName: this.room.name, taskId: taskId})
            .catch(err => {})
    }
}