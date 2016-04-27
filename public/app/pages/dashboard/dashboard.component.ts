import {RouterLink, ROUTER_DIRECTIVES, CanActivate, RouteConfig, Router} from 'angular2/router';
import {Component, Injector} from 'angular2/core';
import {UserStoreService} from '../../common/services/userStore.service';
import {appInjector} from '../../common/config/app.injector';
import {RoomComponent} from './room/room.component';
import {DashboardMainComponent} from './main/dashboardMain.component';

@CanActivate(() => {
    let injector: Injector = appInjector(),
        router: Router = injector.get(Router),
        userStore: UserStoreService = injector.get(UserStoreService),
        user = userStore.getUser();

    if (user) return true;

    else {
        router.navigate(['Login']);
        return false;
    }
})

@Component({
    selector: 'user',
    templateUrl: 'app/user/userLayout.html',
    directives: [
        ROUTER_DIRECTIVES,
        RouterLink
    ]
})

@RouteConfig([
    {path: '/', name: 'DashboardMain', component: DashboardMainComponent, useAsDefault: true},
    {path: '/:roomName', name: 'Room', component: RoomComponent},

    // Catch All route
    {path: '/**', redirectTo: ['DashboardMain']}
])

export class DashboardComponent {}