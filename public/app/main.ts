import {bootstrap}    from '@angular/platform-browser-dynamic'
import {HTTP_PROVIDERS} from '@angular/http'
import {AppComponent} from './app.component'
import {ApiService} from './common/services/api.service'
import {DataService} from './common/services/data.service'
import {UserStoreService} from './common/services/user-store.service'
import {routerProviders} from './app.routes';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {AuthGuard} from './common/guards/auth.guard';
import {DashboardGuard} from './common/guards/dashboard.guard';
import {SocketControlService} from './common/services/socket-control.service';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,

    routerProviders,

    disableDeprecatedForms(),
    provideForms(),

    UserStoreService,
    ApiService,
    DataService,
    SocketControlService,

    // Route Guards
    AuthGuard,
    DashboardGuard
]).catch((err: any) => console.error(err));
