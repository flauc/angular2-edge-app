import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {LayoutComponent} from './pages/layout/layout.component';
import {DashboardResolve} from './common/resolves/dashboard.resolve';
import {AuthGuard} from './common/guards/auth.guard';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {DataService} from './common/services/data.service';
import {SocketGuard} from './common/guards/socket.guard';

const routesConfig: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'login', component: LoginComponent},
            {path: 'sign-up', component: SignUpComponent},
        ]
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard, SocketGuard],
        resolve: {
            rooms: DashboardResolve
        }
    },

    // Catch route
    {path: '**', redirectTo: ''}
];

export const appRoutingComponents: any[] = [
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent
];
export const appRoutingProviders: any[] = [
    AuthGuard,
    DashboardResolve,
    DataService,
    SocketGuard
];
export const routing = RouterModule.forRoot(routesConfig);