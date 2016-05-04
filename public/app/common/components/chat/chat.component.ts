import {Component} from '@angular2/core';
@Component({
    selector: 'edge-chat',
    templateUrl: 'app/common/components/chat/chat.html',
    inputs: ['messages']
})

export class ChatComponent {
    public messages: any;
}