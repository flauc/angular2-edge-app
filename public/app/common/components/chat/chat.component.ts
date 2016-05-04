import {Component} from '@angular/core';
@Component({
    selector: 'edge-chat',
    templateUrl: 'app/common/components/chat/chat.html',
    inputs: ['messages']
})

export class ChatComponent {
    public messages: any;
}