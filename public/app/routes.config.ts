import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {LayoutComponent} from './pages/layout/layout.component';

const routesConfig: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'login', component: LoginComponent},
            {path: 'sign-up', component: SignUpComponent},

            // Catch route
            {path: '**', redirectTo: ''}
        ]
    }
];

export const appRoutingComponents: any[] = [
    LayoutComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent
];
export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routesConfig);