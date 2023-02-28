import { Component, Injector, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Dialog } from 'primeng/dialog';
import { InitializationService } from 'src/app/base/services/initialization.service';
import { PortalService } from 'src/app/base/services/portal.service';
import { ErroresHandler } from 'src/app/base/tools/handler/error/error.handler';

@Component({
    selector: 'app-avisos',
    templateUrl: './avisos.component.html',
    styleUrls: ['./avisos.component.css'],
})
export class AvisosComponent {
    @ViewChild('avisoDialog') dialog: Dialog;

    avisos = [];

    constructor(
        public injector: Injector,
        public translateService: TranslateService,
        private _config: InitializationService,
        private portalService: PortalService,
        private erroresHandler: ErroresHandler
    ) {}

    show_aviso = false;
    showDialog = false;
    aviso = null;

    async ngOnInit() {
        await this.getAvisos(
            this._config.get('SISTEMA.LOGIN')
                ? true
                : this._config.get('SISTEMA.GET_DATA')
        );
    }

    show_all_avisos() {
        if (this.avisos.length > 0) this.showDialog = true;
    }

    select_aviso(data) {
        if (window.outerWidth < 992) {
            this.dialog.maximized = false;
            this.dialog.maximizable = false;
            this.dialog.maximize();
        }
        this.aviso = data.data;
        this.show_aviso = true;
    }

    private async getAvisos(loginCondition) {
        try {
            if (this._config.get('SISTEMA.LOGIN') && loginCondition) {
                if (this._config.get('SISTEMA.LOADS.AVISOS.DATA')) {
                    this.avisos = await this.portalService.getAvisos();
                }
            }
        } catch (e) {
            this.erroresHandler.processError(e, 'none');
        }
    }
}
