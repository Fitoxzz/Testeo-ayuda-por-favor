import { Component } from '@angular/core';
import { InitializationService } from '../../../services/initialization.service';

@Component({
    selector: 'app-simbologia',
    templateUrl: './simbologia.component.html',
    styleUrls: ['./simbologia.component.css'],
})
export class SimbologiaComponent {
    constructor(private _config: InitializationService) {}

    simbolos = [];
    showDialog = false;

    set_simbolos() {
        let root = 'ayuda.simbologia.simbolos';
        this.simbolos = [
            {
                icon: this._config.getIcon('navegacion'),
                titulo: `${root}.navegacion.nombre`,
                glosa: `${root}.navegacion.glosa`,
                subs: null,
                show: this._config.get('SISTEMA.LOADS.MENUS.BUTTON'),
            },
            {
                icon: this._config.getIcon('goback_portal'),
                titulo: `${root}.portal.nombre`,
                glosa: `${root}.portal.glosa`,
                subs: null,
                show: this._config.get('SISTEMA.LOADS.VOLVER_PORTAL.BUTTON'),
            },
            {
                icon: this._config.getIcon('avisos'),
                titulo: `${root}.avisos.nombre`,
                glosa: `${root}.avisos.glosa`,
                subs: null,
                show: this._config.get('SISTEMA.LOADS.AVISOS.BUTTON'),
            },
            {
                icon: this._config.getIcon('ayuda'),
                titulo: `${root}.ayuda.nombre`,
                glosa: `${root}.ayuda.glosa`,
                show: this._config.get('SISTEMA.LINKS.AYUDA.ACTIVO'),
                subs: [
                    {
                        icon: this._config.getIcon('contacto'),
                        titulo: `${root}.ayuda.subs.contacto.nombre`,
                        glosa: `${root}.ayuda.subs.contacto.glosa`,
                        show: this._config.get(
                            'SISTEMA.LINKS.AYUDA.BUTTONS.CONTACTO'
                        ),
                    },
                    {
                        icon: this._config.getIcon('simbologia'),
                        titulo: `${root}.ayuda.subs.simbologia.nombre`,
                        glosa: `${root}.ayuda.subs.simbologia.glosa`,
                        show: this._config.get(
                            'SISTEMA.LINKS.AYUDA.BUTTONS.SIMBOLOGIA'
                        ),
                    },
                ],
            },
            {
                icon: this._config.getIcon('modulos_aplicaciones'),
                titulo: `${root}.modulos_apps.nombre`,
                glosa: `${root}.modulos_apps.glosa`,
                subs: null,
                show:
                    this._config.get('SISTEMA.LOADS.MODULOS.BUTTON') &&
                    this._config.get('SISTEMA.LOADS.APPS.BUTTON'),
            },
            {
                icon: this._config.getIcon('usuario'),
                titulo: `${root}.usuario.nombre`,
                glosa: `${root}.usuario.glosa`,
                show: this._config.get('SISTEMA.LINKS.USUARIO.ACTIVO'),
                subs: [
                    {
                        icon: this._config.getIcon('micuenta'),
                        titulo: `${root}.usuario.subs.profile.nombre`,
                        glosa: `${root}.usuario.subs.profile.glosa`,
                        show: this._config.get(
                            'SISTEMA.LINKS.USUARIO.BUTTONS.PROFILE'
                        ),
                    },
                    {
                        icon: this._config.getIcon('correouv'),
                        titulo: `${root}.usuario.subs.correo.nombre`,
                        glosa: `${root}.usuario.subs.correo.glosa`,
                        show: this._config.get(
                            'SISTEMA.LINKS.USUARIO.BUTTONS.CORREO'
                        ),
                    },
                    {
                        icon: this._config.getIcon('cambiaclave'),
                        titulo: `${root}.usuario.subs.cambiaclave.nombre`,
                        glosa: `${root}.usuario.subs.cambiaclave.glosa`,
                        show: this._config.get(
                            'SISTEMA.LINKS.USUARIO.BUTTONS.CAMBIA_CLAVE'
                        ),
                    },
                    {
                        icon: this._config.getIcon('logout'),
                        titulo: `${root}.usuario.subs.logout.nombre`,
                        glosa: `${root}.usuario.subs.logout.glosa`,
                        show: this._config.get(
                            'SISTEMA.LINKS.USUARIO.BUTTONS.LOG_OUT'
                        ),
                    },
                ],
            },
        ];
        this.showDialog = true;
    }
}
