import {Injectable} from 'angular2/core';
import {appValues} from '../config/app.values';

@Injectable()
export class UserStoreService {
    constructor() {
        this.user = this.getUser();
    }

    public user: any;
    
    private _appName = appValues.name;

    getUser() {
        let temp = localStorage.getItem(this._appName);

        if (temp) return JSON.parse(temp);
        else return false;
    }


    setUser(user?) {
        if (user) {
            localStorage.setItem(this._appName, JSON.stringify(user));
            this.user = user;
        }
        
        else localStorage.removeItem(this._appName);
    }
    
}