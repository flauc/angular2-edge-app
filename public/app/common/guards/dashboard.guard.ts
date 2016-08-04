import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {UserStoreService} from '../services/user-store.service';
import {Observable} from 'rxjs/Rx';
import {SocketControlService} from '../services/socket-control.service';

@Injectable()
export class DashboardGuard implements CanActivate {
    constructor(
        private _data: DataService,
        private _userStore: UserStoreService,
        private _socketControl: SocketControlService,
        private _router: Router) {}

    canActivate() {
        return Observable
            .forkJoin(this._data.getAllData(), this._socketControl.validate())
            .map(a => true)
            .catch(err => {
                // If there was an error the user token is most likely outdated
                // so we remove the local storage data and navigate back to login
                this._userStore.setUser();
                this._router.navigate(['/login']);
                return Observable.throw(err)
            });
    }
}