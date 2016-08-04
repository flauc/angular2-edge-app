import { provideRouter, RouterConfig } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {SignupComponent} from './pages/signUp/signup.component';
import {LoginComponent} from './pages/login/login.component';
import {DashboardRouter} from './pages/dashboard/dashboard.routes';

const routes: RouterConfig = [

    ...DashboardRouter,

    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},

    // Catch route
    {path: '**', component: HomeComponent}
];

export const routerProviders = [
    provideRouter(routes)
];