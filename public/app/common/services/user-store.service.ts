import {Injectable} from '@angular/core'
import {appValues} from '../config/app.values'
import {Subject, BehaviorSubject} from 'rxjs/Rx';

/*
    This service handles storing and retrieving the user object from local storage
 */
@Injectable()
export class UserStoreService {
    constructor() {
        let user = this.getUser();
        if (user) this.emitter.next(user);
    }
    // Components and services can listen to changes on
    // the emitter to find out if the user in local storage has changed
    public emitter: Subject<any> = new BehaviorSubject<any>(null);
    private _appName = appValues.name;

    getUser() {
        let temp = localStorage.getItem(this._appName);
        // Parse and return the user string from local storage
        if (temp) return JSON.parse(temp);
        else return null;
    }


    setUser(user?) {
        // If the user object was provided stringify it and save it to local storage
        if (user) localStorage.setItem(this._appName, JSON.stringify(user));

        // If no user was provided remove the user from local storage
        else localStorage.removeItem(this._appName);

        // Emit the changes to all listeners
        this.emitter.next(user);
    }
    
}