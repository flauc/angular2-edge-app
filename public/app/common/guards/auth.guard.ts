import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserStoreService} from '../services/user-store.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _storageService: UserStoreService,
        private _router: Router) {}

    canActivate() {
        let user = this._storageService.getUser();
        if (user && user.token) return true;
        else {
            this._router.navigate(['./login']);
            return false;
        }
    }
}