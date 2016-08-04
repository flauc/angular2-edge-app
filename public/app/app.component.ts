import './rxjs.imports'
import {Component, OnInit, OnDestroy} from '@angular/core'
import {DomSanitizationService, SafeHtml} from '@angular/platform-browser';
import {ROUTER_DIRECTIVES, Router} from '@angular/router'
import {UserStoreService} from './common/services/user-store.service'

@Component({
    selector: 'edge-app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/app.html',
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(
        private _router: Router,
        private _userStore: UserStoreService,
        // Used to sanitize html before injecting in to the DOM
        private _sanitizer: DomSanitizationService
    ) {}
    
    public user: any;
    public profileImg: SafeHtml;

    private _userChangeListener: any;

    ngOnInit(): void {
        this._userStore.getUser();

        this._userChangeListener = this._userStore.emitter.subscribe(item => {
            this.user = item;
            if (item) this.profileImg = this._sanitizer.bypassSecurityTrustHtml(`<img src="assets/img/profile_icons/icon-${this.user.data.profileImg}.svg" />`);
        })
    }

    logOut() {
        // Remove the user from local storage
        this._userStore.setUser();

        // Navigate to the login page
        this._router.navigate(['/login']);
    }

    // Handle clean up when the component is destroyed
    ngOnDestroy(): void {
        this._userChangeListener.unsubscribe();
    }
}
 