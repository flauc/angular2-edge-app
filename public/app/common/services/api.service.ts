import {Injectable} from '@angular/core'
import {Http, Headers, RequestMethod, Request} from '@angular/http'
import {UserStoreService} from './user-store.service'
import {Observable} from 'rxjs/Rx';

/*
    This service handles all HTTP requests to the server. Handling all
    requests through one service provides a simple way to append headers to all requests
    with out extending angular 2's Http class
 */
@Injectable()
export class ApiService {
    constructor (private _http: Http) {}

    send(url: string, type: "Get" | "Post" | "Put" | "Update" | "Delete", item?: any, id?: string) {

        // Define the options for the request
        let options = {
            method: RequestMethod[type],
            url: url,
            body: '',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        // If the passed item is a string use it
        // Otherwise json stringify it
        if (item) options.body = typeof item === 'string' ? item : JSON.stringify(item);

        return this._http.request(new Request(options))
            .map(res => res.json().data)
            .catch(err => Observable.throw(err));
    }
}