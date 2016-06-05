import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router'
import {LoginComponent} from './pages/login/login.component'
import {SignupComponent} from './pages/signup/signup.component'
import {DashboardComponent} from './pages/dashboard/dashboard.component'
import {UserStoreService} from './common/services/userStore.service'
import {HomeComponent} from './pages/home/home.component'

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/app.html',
})

@Routes([
    {path: '/', component: HomeComponent},
    {path: '/login', component: LoginComponent},
    {path: '/signup', component: SignupComponent},
    {path: '/dashboard', component: DashboardComponent},

    // Catch route
    {path: '*', component: HomeComponent}
])
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
 