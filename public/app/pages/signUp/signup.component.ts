import {ApiService} from '../../common/services/api.service';
import {Component} from 'angular2/core';

@Component({
    selector: 'signup',
    templateUrl: '/signup.html'
})
export class SignupComponent {
    constructor(
        private _api: ApiService
    ) {}
}