import {Injectable} from "angular2/core";
import {Router} from "angular2/router";

@Injectable()
export class IsActiveLinkService {
    constructor(
        private _router: Router
    ) {}

    check(instruction: any[]): boolean {
        return this._router.isRouteActive(this._router.generate(instruction));
    }
}
