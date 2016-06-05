import {Injectable, EventEmitter} from '@angular/core'
import {appValues} from '../config/app.values'

@Injectable()
export class UserStoreService {
    constructor() {
    }

    public emitter: EventEmitter<any> = new EventEmitter();
    private _appName = appValues.name;

    getUser() {
        let temp = localStorage.getItem(this._appName);

        if (temp) return JSON.parse(temp);
        else return false;
    }


    setUser(user?) {
        if (user) {
            localStorage.setItem(this._appName, JSON.stringify(user));
            this.emitter.emit(user);
        }
        
        else {
            localStorage.removeItem(this._appName);
            this.emitter.emit(false);
        }
    }
    
}