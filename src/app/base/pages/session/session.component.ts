import { Component } from '@angular/core';
import { InitializationService } from '../../services/initialization.service';

@Component({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.css'],
})
export class SessionComponent {
    constructor(private _config: InitializationService) {}

    goLogin() {
        window.sessionStorage.clear();
        window.location.replace(this._config.get('SISTEMA.URL.PORTAL'));
    }
}
