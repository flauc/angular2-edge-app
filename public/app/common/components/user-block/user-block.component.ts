import {Component} from '@angular/core'

@Component({
    selector: 'edge-userBlock',
    templateUrl: 'app/common/components/user-block/user-block.html',
    inputs: ['users']
})
export class UserBlockComponent {
    constructor() {}

    public users: any;
    public isVisible: boolean = false;

}