import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../common/services/data.service'
import {ChatComponent} from '../../../common/components/chat/chat.component'
import {SocketControlService} from '../../../common/services/socket-control.service'
import {UserBlockComponent} from '../../../common/components/user-block/user-block.component'

@Component({
    selector: 'room',
    directives: [UserBlockComponent, ChatComponent],
    templateUrl: 'app/pages/dashboard/room/room.html'
})
export class RoomComponent implements OnInit {
    constructor(
        private _activeRoute: ActivatedRoute,
        private _router: Router,
        private _data: DataService,
        private _socketControl: SocketControlService
    ) {}

    public room;

    // Task Creation
    public taskName: string;

    ngOnInit(): void {
        this._activeRoute.params.subscribe(params => {
            this.room = this._data.rooms.find(a => params['name'] === a.name);
            if (!this.room) {
                this._router.navigate(['/dashboard']);
                return false;
            }
        })
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