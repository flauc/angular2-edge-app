import {Component} from '@angular/core'
import {Router} from '@angular/router'
import {ApiService} from '../../common/services/api.service'
import {UserStoreService} from '../../common/services/user-store.service'
import {urlValues} from '../../common/config/url.values';

@Component({
    moduleId: module.id,
    selector: 'edge-sign-up',
    templateUrl:  'sign-up.html'
})
export class SignUpComponent {
    constructor(
        private _router: Router,
        private _userStore: UserStoreService,
        private _api: ApiService
    ) {}
    
    public username: string;
    public password: string;
    public passwordCheck: string;
    public profileImage: number = 0;

    public icons: number[] = Array.from(Array(49).keys());
    
    public submitted: boolean = false;

    selectAvatar(index: number): void {
        this.profileImage = index;
    }

    onSubmit(): void {
        this.submitted = true;
        this._api.send(urlValues.signUp, 'Post', {email: this.username, password: this.password, profileImage: this.profileImage}).subscribe(
            res => this._router.navigate(['/login']),

            err => {
                // Clean the password
                this.password = '';
                this.passwordCheck = '';
                this.submitted = false;
            }
        )
    }
}