import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {appInjector} from './common/config/app.injector';
import {ComponentRef} from 'angular2/core';
// ng2:bootImport
import {UserStoreService} from './common/services/userStore.service'
import {ApiService} from './common/services/api.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {RoomsDataService} from './common/services/roomsData.service';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    // ng2:bootInject
    UserStoreService,
    ApiService,
    RoomsDataService
]).then((appRef: ComponentRef) => {
    // store a reference to the injector
    appInjector(appRef.injector);
});
