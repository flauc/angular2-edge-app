import {Routes} from '@angular/router';
import {RoomComponent} from './room/room.component';
import {DashboardComponent} from './dashboard.component';
import {RoomsComponent} from './rooms/rooms.component';
import {AuthGuard} from '../../common/guards/auth.guard';

export const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {path: '', component: RoomsComponent},
            {path: ':name', component: RoomComponent},


        ]
    }
];

export const dashboardRoutingComponents: any[] = [
    DashboardComponent,
    RoomsComponent,
    RoomComponent
];

export const dashboardProviders: any[] = [
    AuthGuard
];