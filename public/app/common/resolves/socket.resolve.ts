import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {SocketControlService} from '../services/socket-control.service';

@Injectable()
export class SocketResolve implements Resolve<any> {
    constructor(
        private _socket: SocketControlService,
        private _router: Router
    ) {}
    resolve(route: ActivatedRouteSnapshot) {
        return this._socket.validate()
            .then(_ => true)
            .catch(_ => {
                this._router.navigate(['/login']);
                return false;
            })
    }
}