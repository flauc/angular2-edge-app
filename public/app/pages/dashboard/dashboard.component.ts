import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES, Routes, Router, OnActivate} from '@angular/router'
import {appInjector} from '../../common/config/app.injector'
import {RoomComponent} from './room/room.component'
import {DashboardMainComponent} from './main/dashboardMain.component'
import {DataService} from '../../common/services/data.service'
import {SocketControlService} from '../../common/services/socket-control.service'
import {UserBlockComponent} from '../../common/components/user-block/user-block.component'

// TODO add in new veriosn
// @CanActivate(() => {
//     let injector: Injector = appInjector(),
//         router: Router = injector.get(Router),
//         userStore: UserStoreService = injector.get(UserStoreService),
//         data: DataService = injector.get(DataService),
//         user = userStore.getUser();
//
//     if (user) {
//         return data.getAllData()
//             .catch(err => false)
//             .then(res => true)
//     }
//
//     router.navigate(['/login']);
//     return false;
//
// })

@Component({
    selector: 'user',
    templateUrl: 'app/pages/dashboard/dashboard.html',
    providers: [SocketControlService],
    directives: [
        ROUTER_DIRECTIVES,
        UserBlockComponent
    ]
})

@Routes([
    {path: '/', component: DashboardMainComponent},
    {path: '/:name', component: RoomComponent},

    // Catch All route
    {path: '*', component: DashboardMainComponent}
])

export class DashboardComponent implements OnActivate {
    constructor(
        private _socketControl: SocketControlService,
        private _data: DataService
    ) {}

    public users;
    
    // TODO Move this back to canActivate when it gets implemented
    routerOnActivate() {
        this._data.getAllData()
            .then(res => {
                // Validate the socket connection and start listening to client emits
                this._socketControl.validateAndOpenListeners();
                this.users = this._data.users;
            })
    }
}