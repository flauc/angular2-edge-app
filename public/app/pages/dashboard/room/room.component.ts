import {Component} from '@angular/core'
import {RouteSegment, Router} from '@angular/router'
import {DataService} from '../../../common/services/data.service'
import {ChatComponent} from '../../../common/components/chat/chat.component'
import {SocketControlService} from '../../../common/services/socket-control.service'
import {UserBlockComponent} from '../../../common/components/user-block/user-block.component'

@Component({
    selector: 'room',
    directives: [UserBlockComponent, ChatComponent],
    templateUrl: 'app/pages/dashboard/room/room.html'
})
export class RoomComponent {
    constructor(
        private _router: Router,
        private _data: DataService,
        private _socketControl: SocketControlService
    ) {}

    public room;

    // Task Creation
    public taskName: string;

    routerOnActivate(current: RouteSegment): void {
        // Check if we are in a room that exists
        let currentRoom = this._data.rooms.find(a => a.name === current.getParam('name'));
        if (currentRoom) this.room = currentRoom;
        else this._router.navigate(['/']);
    }

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