import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SocketControlService} from '../services/socket-control.service';

@Injectable()
export class SocketGuard implements CanActivate {
    constructor(
        private _socket: SocketControlService,
        private _router: Router
    ) {}

    canActivate(): boolean {
        return this._socket.validate()
            .then(_ => true)
            .catch(_ => {
                this._router.navigate(['/login']);
                return false;
            })
    }
}