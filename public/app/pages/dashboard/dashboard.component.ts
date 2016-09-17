import {Component, OnInit} from '@angular/core';
import {DataService} from '../../common/services/data.service';
import {Observable} from 'rxjs';
import {Room} from '../../common/interfaces/room.interface';
import {UserStoreService} from '../../common/services/user-store.service';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'edge-dashboard',
    templateUrl: 'dashboard.html',
})

export class DashboardComponent implements OnInit {
    constructor(
        private _router: Router,
        private _data: DataService,
        private _userStore: UserStoreService
    ) { }

    public rooms: Observable<Room[]>;
    public chatOpen: boolean = false;

    ngOnInit() {
        this.rooms = this._data.rooms;
    }

    toggleChat(): void {

    }

    logOut(): void {
        this._userStore.setUser();
        this._router.navigate(['/login'])
    }
}