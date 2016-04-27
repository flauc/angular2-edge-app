import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
// ng2:bootImport
import {UserStoreService} from './common/services/userStore.service'

bootstrap(AppComponent, [
    // ng2:bootInject
    UserStoreService
]);
