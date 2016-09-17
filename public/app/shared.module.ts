import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ApiService} from './common/services/api.service';
import {UserStoreService} from './common/services/user-store.service';
import {SocketControlService} from './common/services/socket-control.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,

    ],
    providers: [
        // Services
        UserStoreService,
        SocketControlService,
        ApiService
    ],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule
    ]
})
export class SharedModule {}