import {Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'edge-dashboard',
    templateUrl: 'dashboard.html',
})

export class DashboardComponent implements OnInit {


    public users;
    public chatOpen: boolean = false;

    ngOnInit() {

    }

    toggleChat(): void {

    }
}