import { Component } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { InitializationService } from '../../../services/initialization.service';
import * as Sentry from '@sentry/angular';

@Component({
    selector: 'app-idle-handler',
    templateUrl: './idle-handler.component.html',
    styleUrls: ['./idle-handler.component.css'],
})
@Sentry.TraceClassDecorator()
export class IdleHandlerComponent {
    constructor(private _config: InitializationService, private idle: Idle) {}

    showIdle = false;

    async ngOnInit() {
        await this.idleHandler();
    }

    private async idleHandler() {
        if (this._config.get('IDLE.ACTIVO')) {
            this.idle.setIdle(0.1);
            this.idle.setTimeout(this._config.get('IDLE.TIEMPO_SESION'));
            this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

            this.idle.onTimeout.subscribe(() => {
                this.showIdle = false;
                window.sessionStorage.clear();
                window.location.replace(this._config.get('SISTEMA.URL.PORTAL'));
            });

            this.idle.onTimeoutWarning.subscribe(async (countdown) => {
                if (countdown == this._config.get('IDLE.TIEMPO_AVISO'))
                    this.showIdle = true;
            });

            this.idle.watch();
        }
    }

    reset() {
        this.showIdle = false;
        this.idle.watch();
    }
}
