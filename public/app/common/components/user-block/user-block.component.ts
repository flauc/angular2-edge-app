import {Component} from '@angular/core'

@Component({
    selector: 'edge-userBlock',
    templateUrl: '/userBlock.html',
    inputs: ['users']
})
export class UserBlockComponent {
    constructor() {}

    public users: any;
    public isVisible: boolean = false;

}