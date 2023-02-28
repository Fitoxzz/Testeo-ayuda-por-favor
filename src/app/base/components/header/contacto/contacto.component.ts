import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PortalService } from 'src/app/base/services/portal.service';
import { PanelControlService } from 'src/app/base/services/panel_control.service';
import { SystemService } from 'src/app/base/services/system.service';
import { ErroresHandler } from 'src/app/base/tools/handler/error/error.handler';
import { InitializationService } from '../../../services/initialization.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-contacto',
    templateUrl: './contacto.component.html',
    styleUrls: ['./contacto.component.css'],
    providers: [ConfirmationService],
})
export class ContactoComponent {
    template: any;
    @Input() user: any;
    modulo_activo: any = null;
    app_activa: any = null;

    anonUser = !this._config.get('SISTEMA.LOGIN');
    showDialog = false;

    constructor(
        private _config: InitializationService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        public translateService: TranslateService,
        private portalService: PortalService,
        private panelControlService: PanelControlService,
        private erroresHandler: ErroresHandler,
        private systemService: SystemService
    ) {
        this.template = {
            correoUV: '',
            body: '',
            nombre: '',
            rut: '',
        };
    }

    async ngOnInit() {
        this.panelControlService.panel$.subscribe((res) => {
            this.modulo_activo = res['module'];
            this.app_activa = res['app'];
        });
    }

    show_contacto() {
        this.template.correoUV = this.user.correo_uv;
        this.showDialog = true;
    }

    async sendContacto() {
        var fg = await new Promise((t) => {
            this.translateService
                .get([
                    'ayuda.contacto.validar.success',
                    'ayuda.contacto.success',
                    'ayuda.contacto.error',
                    'primeng.accept',
                ])
                .subscribe((r) => t(r));
        });
        try {
            this.messageService.clear();
            this.confirmationService.confirm({
                message: fg['ayuda.contacto.validar.success'],
                acceptLabel: fg['primeng.accept'],
                accept: async () => {
                    this.systemService.setLoading(true);

                    let param = {
                        correoUV: this.template.correoUV,
                        subject: `[${
                            this.modulo_activo != null
                                ? this.modulo_activo.nombre
                                : this._config.get('SISTEMA.NOMBRE')
                        }]`,
                        body: `${
                            this.template.body
                        }<br/><br/>-----------<br/>Este correo ha sido generado desde:<br/><br/>Portal: ${
                            this.app_activa
                                ? this.app_activa.nombre
                                : 'SIN DEFINIR'
                        }<br/>Aplicación: ${
                            this.modulo_activo != null
                                ? this.modulo_activo.nombre
                                : this._config.get('SISTEMA.NOMBRE')
                        }`,
                        rut: this.anonUser ? this.template.rut : this.user.rut,
                        user: this.anonUser
                            ? this.template.nombre
                            : this.user.nombre_completo,
                    };

                    this.showDialog = false;
                    await this.portalService.sendContactMail(param);

                    this.systemService.setLoading(false);

                    this.messageService.add({
                        severity: 'success',
                        detail: fg['ayuda.contacto.success'],
                        key: 'contacto',
                    });
                },
            });
        } catch (e) {
            this.erroresHandler.processError(
                e,
                'alert',
                fg['ayuda.contacto.error']
            );
        }
    }
}
