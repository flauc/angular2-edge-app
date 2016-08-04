import {RouterConfig} from '@angular/router';
import {DashboardMainComponent} from './main/dashboardMain.component';
import {RoomComponent} from './room/room.component';
import {DashboardComponent} from './dashboard.component';
import {AuthGuard} from '../../common/guards/auth.guard';
import {DashboardGuard} from '../../common/guards/dashboard.guard';

export const DashboardRouter: RouterConfig = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [
            // AuthGuard prevents users that aren't logged in from accessing the dashboard
            AuthGuard,
            // DashboardGuard makes sure all room and user data has loaded before
            // loading the component and showing the view
            DashboardGuard
        ],
        children: [
            {path: '', component: DashboardMainComponent},
            {path: 'room/:name', component: RoomComponent},

            // Catch All route
            {path: '**', component: DashboardMainComponent}
        ]
    }
];