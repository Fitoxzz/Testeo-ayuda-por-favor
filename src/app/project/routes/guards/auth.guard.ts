import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';
import { PanelControlService } from '../../../base/services/panel_control.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private panelControlService: PanelControlService,
        private translateService: TranslateService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        var find = this.panelControlService
            .getMenusHome()
            .find((e: any) => `/${e.metodo}` === state.url);
        if (find) return true;
        else {
            this.translateService.get('routing.canActivate').subscribe((r) => {
                alert(r);
            });
            return false;
        }
    }
}
