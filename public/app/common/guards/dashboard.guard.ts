import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {UserStoreService} from '../services/user-store.service';

@Injectable()
export class DashboardGuard implements CanActivate {
    constructor(
        private _data: DataService,
        private _userStore: UserStoreService,
        private _router: Router) {}

    canActivate() {
        return new Promise((resolve, reject) => {
            return this._data.getAllData()
                .then(data => resolve(true))
                .catch(err => {
                    console.log('got here: ', err);
                    // If there was an error the user token is most likely outdated
                    // so we remove the local storage data and navigate back to login
                    this._userStore.setUser();
                    this._router.navigate(['/login']);
                    return  reject(false)
                })
        })
    }
}