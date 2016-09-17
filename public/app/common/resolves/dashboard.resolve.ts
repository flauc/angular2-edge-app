import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {ApiService} from '../services/api.service';
import {urlValues} from '../config/url.values';
import {UserStoreService} from '../services/user-store.service';
import {DataService} from '../services/data.service';
import {Room} from '../interfaces/room.interface';

@Injectable()
export class DashboardResolve implements Resolve<any> {
    constructor(
        private _api: ApiService,
        private _userStore: UserStoreService,
        private _data: DataService,
        private _router: Router
    ) {}
    resolve(route: ActivatedRouteSnapshot) {

        return this._api.send(urlValues.getRooms, 'Get').subscribe(
            (res: Room[]) => {
                this._data.loadRooms(res);
                return true;
            },
            err => {
                this._router.navigate(['/']);
                this._userStore.setUser();
                return false;
            }
        );
    }
}