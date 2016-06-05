import {Injectable} from '@angular/core'
import {Http, Headers, RequestMethod, Request} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import {UserStoreService} from './userStore.service'
import {urlValues} from '../config/app.values'

@Injectable()
export class ApiService {
    constructor (
        private _http: Http,
        private _userStoreService: UserStoreService
    ) {}

    private _url: any = urlValues;

    send(name, item?, id?) {

        let url: string,
            type: any,
            body: any,
            authHeader: boolean = true;

        // Set the right url using the provided name
        switch (name) {

            // Login
            case 'login':
                url = this._url.login;
                type = RequestMethod.Post;
                authHeader = false;
                break;
            
            // Create a user 
            // Used on sign up
            case 'signUp':
                url = this._url.signUp;
                type = RequestMethod.Post;
                authHeader = false;
                break;

            // Get all users
            case 'getUsers':
                url = this._url.getUsers;
                type = RequestMethod.Get;
                break;

            // Get all rooms
            case 'getRooms':
                url = this._url.getRooms;
                type = RequestMethod.Get;
                break;
        }

        // Define the options for the request
        let options = {
            method: type,
            url: url,
            body: null,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        // If the passed item is a string use it
        // Otherwise json stringify it
        if (item) {
            body = typeof item === 'string' ? item : JSON.stringify(item);
            options.body = body;
        }

        // If authHeader is true we need to append the token to the header
        if (authHeader) options.headers.append('Authorization', 'Bearer ' + this._userStoreService.getUser().token);

        return this._http.request(new Request(options))
            .map(res => res.json())
            .catch(this.logError);
    }

    private logError (error: Error) {
        return Observable.throw(error);
    }
}