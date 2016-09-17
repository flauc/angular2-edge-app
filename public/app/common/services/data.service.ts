import {Injectable} from '@angular/core'
import {ApiService} from './api.service'
import {Subject, BehaviorSubject} from 'rxjs/Rx';
import {Room} from '../interfaces/room.interface';

/*
    This service handles getting data that the application requires from the server
    via HTTP requests through the ApiService
 */
@Injectable()
export class DataService {
    constructor(
        private _api: ApiService
    ) {}

    public rooms: Subject<Room[]> = new BehaviorSubject([]);
    public users: Subject<any> = new BehaviorSubject([]);
}