import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {appInjector} from './common/config/app.injector';
import {ComponentRef} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
// ng2:bootImport
import {UserStoreService} from './common/services/userStore.service'
import {ApiService} from './common/services/api.service';
import {DataService} from './common/services/data.service';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    // ng2:bootInject
    UserStoreService,
    ApiService,
    DataService
]).then((appRef: ComponentRef) => {
    // store a reference to the injector
    appInjector(appRef.injector);
});
