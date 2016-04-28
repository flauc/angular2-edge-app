import 'rxjs/Rx';
import {Component} from 'angular2/core';
import {LoginComponent} from './pages/login/login.component';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {SignupComponent} from './pages/signup/signup.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {UserStoreService} from './common/services/userStore.service';
import {IsActiveLinkService} from './common/services/isActiveLink.service';

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [IsActiveLinkService]
})

@RouteConfig([
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/signup', name: 'Signup', component: SignupComponent},
    {path: '/dashboard/...', name: 'Dashboard', component: DashboardComponent},

    // Catch route
    {path: '/**', redirectTo: ['Login']}
])
export class AppComponent {
    constructor(
        public isActiveLink: IsActiveLinkService,
        private _router: Router,
        private _userStore: UserStoreService
    ) {
        this.user = _userStore.getUser();
        this.userChangeListener = _userStore.emitter.subscribe(item => this.user = item)
    }
    
    public user: any;
    public userChangeListener: any;

    logOut() {
        this._userStore.setUser();
        this._router.navigate(['Login']);
    }
}
 