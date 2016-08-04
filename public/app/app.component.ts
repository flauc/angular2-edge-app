import './rxjs.imports'
import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES, Router} from '@angular/router'
import {UserStoreService} from './common/services/user-store.service'

@Component({
    selector: 'edge-app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/app.html',
})
export class AppComponent {
    constructor(
        private _router: Router,
        private _userStore: UserStoreService
    ) {
        this.user = _userStore.getUser();
        
        if (this.user) this.profileImg = `<img src="assets/img/profile_icons/icon-${this.user.data.profileImg}.svg" />`;
        
        this.userChangeListener = _userStore.emitter.subscribe(item => {
            this.user = item;
            if (item) this.profileImg = `<img src="assets/img/profile_icons/icon-${this.user.data.profileImg}.svg" />`;
        })
    }
    
    public user: any;
    public userChangeListener: any;
    public profileImg: string;

    logOut() {
        this._userStore.setUser();
        this._router.navigate(['/login']);
    }
}
 