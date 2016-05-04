import {Component} from '@angular/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {UserStoreService} from './common/services/userStore.service';
import {HomeComponent} from './pages/home/home.component';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/app.html',
})

@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent},
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/signup', name: 'Signup', component: SignupComponent},
    {path: '/dashboard/...', name: 'Dashboard', component: DashboardComponent},

    // Catch route
    {path: '/**', redirectTo: ['Home']}
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
            this.profileImg = `<img src="assets/img/profile_icons/icon-${this.user.data.profileImg}.svg" />`;
        })
    }
    
    public user: any;
    public userChangeListener: any;
    public profileImg: string;

    logOut() {
        this._userStore.setUser();
        this._router.navigate(['Login']);
    }
}
 