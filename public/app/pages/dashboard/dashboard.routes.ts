import {RouterConfig} from '@angular/router';
import {DashboardMainComponent} from './main/dashboardMain.component';
import {RoomComponent} from './room/room.component';
import {DashboardComponent} from './dashboard.component';

export const DashboardRouter: RouterConfig = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {path: '', component: DashboardMainComponent},
            {path: 'room/:name', component: RoomComponent},

            // Catch All route
            {path: '**', component: DashboardMainComponent}
        ]
    }
];