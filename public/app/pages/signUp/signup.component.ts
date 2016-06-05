import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {ApiService} from '../../common/services/api.service'
import {UserStoreService} from '../../common/services/userStore.service'

@Component({
    selector: 'signup',
    templateUrl: 'app/pages/signup/signup.html'
})
export class SignupComponent {
    constructor(
        private _router: Router,
        private _userStore: UserStoreService,
        private _api: ApiService
    ) {}
    
    public username: string;
    public password: string;
    public passwordCheck: string;
    
    public submitted: boolean = false;

    // TODO add logic for validation (password's need to match)

    onSubmit() {
        this.submitted = true;
        this._api.send('signUp', {username: this.username, password: this.password}).subscribe(
            res => {
                // Remove success so we don't store it in local
                delete res['success'];
                // Store the user data in local storage
                this._userStore.setUser(res);
                this._router.navigate(['/dashboard'])
            },

            err => {
                // Clean the password
                this.password = '';
                this.passwordCheck = '';
                this.submitted = false;
            }
        )
    }
}