import {Injectable} from 'angular2/core';
import {ApiService} from './api.service';

@Injectable()
export class RoomsDataService {
    constructor(
        private _api: ApiService
    ) {}
    
    public rooms: any;
    
    getRooms() {
        return new Promise((resolve, reject) => {
            this._api.send('getRooms').subscribe(
                res => {
                    this.rooms = res;
                    resolve(res)
                }, 
                err => reject(err)
            )
        })
    }
}