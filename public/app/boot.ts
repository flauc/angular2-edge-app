import {bootstrap}    from '@angular/platform-browser-dynamic'
import {HTTP_PROVIDERS} from '@angular/http'
import {AppComponent} from './app.component'
import {ApiService} from './common/services/api.service'
import {DataService} from './common/services/data.service'
import {UserStoreService} from './common/services/user-store.service'

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    UserStoreService,
    ApiService,
    DataService
]);
