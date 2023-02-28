import { Component, OnInit } from '@angular/core';
import { PanelControlService } from '../../services/panel_control.service';
import { PortalService } from '../../services/portal.service';
import { ErroresHandler } from '../../tools/handler/error/error.handler';
import { InitializationService } from '../../services/initialization.service';
import { SystemService } from '../../services/system.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-modulo-aplicacion',
    templateUrl: './modulo-aplicacion.component.html',
    styleUrls: ['./modulo-aplicacion.component.css'],
})
export class ModuloAplicacionComponent implements OnInit {
    config: Object = this._config.get();

    constructor(
        private _config: InitializationService,
        private systemService: SystemService,
        private panelControlService: PanelControlService,
        private portalService: PortalService,
        private erroresHandler: ErroresHandler,
        private translateService: TranslateService,
        private messageService: MessageService
    ) {
        if (this._config.get('SISTEMA.LOADS.APPS.BUTTON'))
            this.tabs.push({
                label: 'mods_apps.modulos.titulo',
                command: (event) => (this.index = 0),
            });
        if (this._config.get('SISTEMA.LOADS.MODULOS.BUTTON'))
            this.tabs.push({
                label: 'mods_apps.aplicaciones.titulo',
                command: (event) => (this.index = 1),
            });
    }

    async ngOnInit() {
        let loginCondition = this._config.get('SISTEMA.LOGIN')
            ? true
            : this._config.get('SISTEMA.GET_DATA');
        await this.getModulos(loginCondition);
        await this.getAplicaciones(loginCondition);
        this.panelControlService.panelSubject.next({
            module: this.modulo_selected,
            app: this.app_selected,
        });
    }

    show = false;
    index = 0;

    tabs = [];

    aplicaciones = [];
    private aplicacionesBack = [];
    app_selected;
    filterA = '';

    modulos = [];
    private modulosBack = [];
    modulo_selected;
    filterM = '';

    do_show() {
        this.index = 0;
        this.show = !this.show;
    }

    async go_modulo_app(data, tipo) {
        try {
            this.systemService.setLoading(true);
            switch (tipo) {
                case 'modulo':
                    if (data.estado == 1) {
                        // 0 = desactivado
                        // 2 = mantención
                        // 3 = en desarrollo
                        await this.portalService.gotoModule({
                            proyecto: this.app_selected.id,
                            modulo: data.cod_modulo,
                        });
                    } else {
                        var fg = await new Promise((t) => {
                            this.translateService
                                .get(['mods_apps.modulos.maintenance'])
                                .subscribe((r) => t(r));
                        });
                        this.messageService.add({
                            severity: 'info',
                            summary: data.nombre,
                            detail: fg['mods_apps.modulos.maintenance'],
                            key: 'main',
                        });
                        this.systemService.setLoading(false);
                    }
                    break;
                case 'aplicacion':
                    if (data.id == this.app_selected.id)
                        await this.portalService.backToPortal({
                            proyecto: data.id,
                        });
                    else
                        await this.portalService.gotoApp({
                            proyecto: data.id,
                        });
                    break;
            }
        } catch (e) {
            var fg = await new Promise((t) => {
                this.translateService
                    .get(['mods_apps.errorNavigate'])
                    .subscribe((r) => t(r));
            });
            this.erroresHandler.processError(
                e,
                'alert',
                fg['mods_apps.errorNavigate']
            );
            this.systemService.setLoading(false);
        }
    }

    private async getModulos(loginCondition) {
        try {
            if (
                this._config.get('SISTEMA.LOADS.MODULOS.DATA') &&
                loginCondition
            ) {
                let _modulos = await this.panelControlService.getModulos({
                    codModulo: window.sessionStorage.getItem('modulo'),
                });
                this.modulos = _modulos.modulos;
                this.modulosBack = _modulos.modulos;
                this.modulo_selected = _modulos.active;
            }
        } catch (e) {
            var fg = await new Promise((t) => {
                this.translateService
                    .get(['mods_apps.modulos.error'])
                    .subscribe((r) => t(r));
            });
            e['navigation'] = true;
            this.erroresHandler.processError(
                e,
                'page',
                fg['mods_apps.modulos.error']
            );
        }
    }

    private async getAplicaciones(loginCondition) {
        try {
            if (this._config.get('SISTEMA.LOADS.APPS.DATA') && loginCondition) {
                var aplicaciones =
                    await this.panelControlService.getAplicaciones({
                        id_proyecto: window.sessionStorage.getItem('proyecto'),
                    });
                this.aplicaciones = aplicaciones.apps;
                this.aplicacionesBack = aplicaciones.apps;
                this.app_selected = aplicaciones.active;
            }
        } catch (e) {
            var fg = await new Promise((t) => {
                this.translateService
                    .get([
                        'mods_apps.aplicaciones.titulo',
                        'mods_apps.aplicaciones.error',
                    ])
                    .subscribe((r) => t(r));
            });
            e['navigation'] = true;
            this.erroresHandler.processError(
                e,
                'page',
                fg['mods_apps.aplicaciones.error']
            );
        }
    }

    filtering(mode) {
        switch (mode) {
            case 'modulo':
                this.modulos = [];
                this.modulosBack.forEach((e) => {
                    let tmp = this.systemService.filtering(
                        e.modulos,
                        this.filterM,
                        'nombre'
                    );
                    if (tmp.length > 0) {
                        this.modulos.push({
                            grupo: e.grupo,
                            modulos: tmp,
                            grupo_activo: e.grupo_activo,
                        });
                    }
                });
                break;
            case 'aplicacion':
                this.aplicaciones = [];
                this.aplicacionesBack.forEach((e) => {
                    let tmp = this.systemService.filtering(
                        e.apps,
                        this.filterA,
                        'nombre'
                    );
                    if (tmp.length > 0) {
                        this.aplicaciones.push({
                            grupo: e.grupo,
                            apps: tmp,
                        });
                    }
                });
                break;
        }
    }
}
