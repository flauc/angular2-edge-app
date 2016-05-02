import {RouterLink, ROUTER_DIRECTIVES, CanActivate, RouteConfig, Router} from 'angular2/router';
import {Component, Injector} from 'angular2/core';
import {UserStoreService} from '../../common/services/userStore.service';
import {appInjector} from '../../common/config/app.injector';
import {RoomComponent} from './room/room.component';
import {DashboardMainComponent} from './main/dashboardMain.component';
import {DataService} from '../../common/services/data.service';
import {SocketControlService} from '../../common/services/socketControl.service';
import {UserBlockComponent} from '../../common/components/userBlock/userBlock.component';

@CanActivate(() => {
    let injector: Injector = appInjector(),
        router: Router = injector.get(Router),
        userStore: UserStoreService = injector.get(UserStoreService),
        data: DataService = injector.get(DataService),
        user = userStore.getUser();

    if (user) {
        return data.getAllData()
            .catch(err => false)
            .then(res => true)
    }

    router.navigate(['Login']);
    return false;

})

@Component({
    selector: 'user',
    templateUrl: 'app/pages/dashboard/dashboard.html',
    providers: [SocketControlService],
    directives: [
        ROUTER_DIRECTIVES,
        RouterLink,
        UserBlockComponent
    ]
})

@RouteConfig([
    {path: '/', name: 'DashboardMain', component: DashboardMainComponent, useAsDefault: true},
    {path: '/:name', name: 'Room', component: RoomComponent},

    // Catch All route
    {path: '/**', redirectTo: ['DashboardMain']}
])

export class DashboardComponent {
    constructor(
        private _socketControl: SocketControlService,
        private _data: DataService
    ) {
        // Validate the socket connetion and start listening to client emits
        _socketControl.validateAndOpenListeners();
        this.users = _data.users;
    }

    public users;
}