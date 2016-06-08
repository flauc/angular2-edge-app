import {Component} from '@angular/core'
import {SocketControlService} from '../../services/socket-control.service';

@Component({
    selector: 'edge-chat',
    templateUrl: 'app/common/components/chat/chat.html',
    inputs: ['roomName']
})

export class ChatComponent {
    constructor(
        private _socketControl: SocketControlService
    ) {}
    // Inputs
    public roomName: string;

    // Local
    public messages: any;
}