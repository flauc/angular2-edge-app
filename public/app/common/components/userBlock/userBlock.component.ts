import {Component} from '@angular/core'

@Component({
    selector: 'edge-userBlock',
    templateUrl: 'app/common/components/userBlock/userBlock.html',
    inputs: ['users']
})
export class UserBlockComponent {
    constructor() {}

    public users: any;
    public isVisible: boolean = false;

}