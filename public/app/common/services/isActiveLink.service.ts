import {Injectable} from "@angular/core";
import {Router} from '@angular/router-deprecated';

@Injectable()
export class IsActiveLinkService {
    constructor(
        private _router: Router
    ) {}

    check(instruction: any[]): boolean {
        return this._router.isRouteActive(this._router.generate(instruction));
    }
}
