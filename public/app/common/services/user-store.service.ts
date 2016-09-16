import {Injectable} from '@angular/core'
import {appValues} from '../config/app.values'

/*
    This service handles storing and retrieving the user object from local storage
 */
@Injectable()
export class UserStoreService {
    getUser() {
        let temp = localStorage.getItem(appValues.name);
        // Parse and return the user string from local storage
        if (temp) return JSON.parse(temp);
        else return null;
    }


    setUser(user?) {
        // If the user object was provided stringify it and save it to local storage
        if (user) localStorage.setItem(appValues.name, JSON.stringify(user));
        // If no user was provided remove the user from local storage
        else localStorage.removeItem(appValues.name);
    }
    
}