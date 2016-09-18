import {Component, OnDestroy, OnInit} from '@angular/core'
import {Message} from '../../../common/interfaces/message.interface';
import {DataService} from '../../../common/services/data.service';
import {User} from '../../../common/interfaces/user.interface';
import {SocketControlService} from '../../../common/services/socket-control.service';
import {Observable} from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'edge-chat',
    templateUrl: 'chat.html',
})

export class ChatComponent implements OnInit, OnDestroy {
    constructor(
        private _data: DataService,
        private _socket: SocketControlService
    ) {}

    public open: boolean = false;
    public userView: boolean = false;

    public users: Observable<User[]>;
    public message: string;
    public messages: Message[] = [];

    private _msgListener: any;

    ngOnInit() {
        this.users = this._data.users;
        // We listen for new messages from the DataService
        this._msgListener = this._data.message.subscribe(a => this.messages.push(a))
    }

    toggle() { this.open = !this.open; }
    toggleView(view: boolean) { this.userView = view; }

    newMessage(keyCode: number) {
        if (keyCode === 13) {
            this._socket.newMessage(this.message);
            this.message = '';
        }
    }

    ngOnDestroy() {
        // When the component is destroyed we make sure to unsubscribe our message listener
        if (this._msgListener) this._msgListener.unsubscribe();
    }
}