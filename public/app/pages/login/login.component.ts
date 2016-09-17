import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {ApiService} from '../../common/services/api.service'
import {UserStoreService} from '../../common/services/user-store.service';
import {urlValues} from '../../common/config/url.values';


@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl:  'login.html'
})

export class LoginComponent {
    constructor(
        private _router: Router,
        private _userStore: UserStoreService,
        private _api: ApiService
    ) {}

    public username: string;
    public password: string;
    public error: string;
    public submitted = false;

    onSubmit() {
        this.submitted = true;
        this._api.send(urlValues.login, 'Post', {email: this.username, password: this.password}).subscribe(
            res => {
                // Store the user data in local storage
                this._userStore.setUser(res);
                this._router.navigate(['/dashboard'])
            },

            err => {
                // Clean the password
                this.password = '';
                this.submitted = false;
            }
        )
    }
}