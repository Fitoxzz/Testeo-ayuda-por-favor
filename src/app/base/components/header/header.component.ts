import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ContactoComponent } from './contacto/contacto.component';
import { AvisosComponent } from './avisos/avisos.component';
import { PortalService } from '../../services/portal.service';
import { SimbologiaComponent } from './simbologia/simbologia.component';
import { ProfileComponent } from './profile/profile.component';
import { MenusComponent } from '../menus/menus.component';
import { ModuloAplicacionComponent } from '../modulo-aplicacion/modulo-aplicacion.component';
import { ErroresHandler } from '../../tools/handler/error/error.handler';
import { PanelControlService } from '../../services/panel_control.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { InitializationService } from '../../services/initialization.service';
import { ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { SystemService } from '../../services/system.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [ConfirmationService],
})
export class HeaderComponent implements OnInit {
    config = this._config.get();
    @Input() user_online: any;
    title: string = this._config.get('SISTEMA.NOMBRE');
    tokenError: boolean = false;
    maintenance: boolean = false;
    navigationError: boolean = false;
    datePipe = new DatePipe('es-ES');

    @ViewChild(MenusComponent) menus: MenusComponent;
    @ViewChild(ModuloAplicacionComponent)
    modulo_aplicaciones: ModuloAplicacionComponent;
    @ViewChild(ContactoComponent) contacto: ContactoComponent;
    @ViewChild(AvisosComponent) avisos_component: AvisosComponent;
    @ViewChild(SimbologiaComponent) simbologia_component: SimbologiaComponent;
    @ViewChild(ProfileComponent) profile: ProfileComponent;

    constructor(
        public _config: InitializationService,
        public translateService: TranslateService,
        private portalService: PortalService,
        private erroresHandler: ErroresHandler,
        private panelControlService: PanelControlService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private systemService: SystemService
    ) {}

    ayudaItems = [
        {
            label: 'Ayuda',
            id: 'ayuda.nombre',
            items: [
                {
                    label: 'Contacto',
                    id: 'ayuda.contacto.titulo',
                    icon: this._config.getIcon('contacto'),
                    visible: this.config.SISTEMA.LINKS.AYUDA.BUTTONS.CONTACTO,
                    command: () => {
                        this.contacto.show_contacto();
                    },
                },
                {
                    label: 'Simbilogía',
                    id: 'ayuda.simbologia.titulo',
                    icon: this._config.getIcon('simbologia'),
                    visible: this.config.SISTEMA.LINKS.AYUDA.BUTTONS.SIMBOLOGIA,
                    command: () => {
                        this.simbologia_component.set_simbolos();
                    },
                },
            ],
        },
    ];

    usuarioItems = [
        {
            label: 'Mi cuenta',
            id: 'usuario.titulo',
            items: [
                {
                    label: 'Mis datos',
                    id: 'usuario.profile.titulo',
                    icon: this._config.getIcon('micuenta'),
                    visible: this.config.SISTEMA.LINKS.USUARIO.BUTTONS.PROFILE,
                    command: () => {
                        this.profile.show_profile();
                    },
                },
                {
                    label: 'Correo UV',
                    id: 'usuario.profile.correo_uv',
                    icon: this._config.getIcon('correouv'),
                    visible: this.config.SISTEMA.LINKS.USUARIO.BUTTONS.CORREO,
                    command: () => {
                        this.goto_correo();
                    },
                },
                {
                    label: 'Cambia clave',
                    id: 'usuario.cambia_clave',
                    icon: this._config.getIcon('cambiaclave'),
                    visible:
                        this.config.SISTEMA.LINKS.USUARIO.BUTTONS.CAMBIA_CLAVE,
                    command: () => {
                        this.goto_cambiaclave();
                    },
                },
                {
                    separator: true,
                    visible: this.config.SISTEMA.LINKS.USUARIO.BUTTONS.LOG_OUT,
                },
                {
                    label: 'Cerrar sesión',
                    id: 'usuario.logout',
                    icon: this._config.getIcon('logout'),
                    visible: this.config.SISTEMA.LINKS.USUARIO.BUTTONS.LOG_OUT,
                    command: async () => {
                        await this.logout();
                    },
                },
            ],
        },
    ];

    async ngOnInit() {
        this.panelControlService.panel$.subscribe(async (res) => {
            let name = this._config.get('SISTEMA.NOMBRE');
            if (res['module'] != undefined) {
                name = res['module'].nombre;
                if (res['module'].estado == 2) {
                    var fg = await new Promise((t) => {
                        this.translateService
                            .get(['system_handler.maintenance.titulo'])
                            .subscribe((r) => t(r));
                    });

                    this.maintenance = true;
                    this.router.navigate(['/maintenance'], {
                        state: {
                            mode: 'module',
                            name: fg['system_handler.maintenance.titulo'],
                        },
                    });
                }
            }
            this.title = name;
        });

        this.erroresHandler.error$.subscribe((res) => {
            this.tokenError = res.hasOwnProperty('token')
                ? res['token']
                : false;
            this.navigationError = res.hasOwnProperty('navigation')
                ? res['navigation']
                : false;
        });

        this.systemService.languaje$.subscribe(async () => {
            await this.setLanguajeMenuItems(this.ayudaItems);
            await this.setLanguajeMenuItems(this.usuarioItems);
        });

        await this.setLanguajeMenuItems(this.ayudaItems);
        await this.setLanguajeMenuItems(this.usuarioItems);
    }

    private async setLanguajeMenuItems(data) {
        for (let i = 0; i < data.length; i++) {
            var e = data[i];
            if (e.hasOwnProperty('id')) {
                e.label = await new Promise((t) =>
                    this.translateService.get(e.id).subscribe((r) => t(r))
                );
            }
            if (e.hasOwnProperty('items')) {
                await this.setLanguajeMenuItems(e.items);
            }
        }
    }

    async backToPortal() {
        var fg = await new Promise((t) => {
            this.translateService
                .get([
                    'button.volver_al_portal.text',
                    'button.volver_al_portal.label',
                ])
                .subscribe((r) => t(r));
        });
        if (!this.tokenError) {
            if (window.innerWidth > 992) {
                this._backToPortal();
            } else {
                this.confirmationService.confirm({
                    header: fg['button.volver_al_portal.label'],
                    message: fg['button.volver_al_portal.text'],
                    acceptLabel: fg['primeng.accept'],
                    accept: async () => {
                        this._backToPortal();
                    },
                });
            }
        }
    }

    async _backToPortal() {
        try {
            await this.portalService.backToPortal({
                proyecto: window.sessionStorage.getItem('proyecto'),
            });
        } catch (e) {
            var fg = await new Promise((t) => {
                this.translateService
                    .get(['button.volver_al_portal.error'])
                    .subscribe((r) => t(r));
            });
            this.erroresHandler.processError(
                e,
                'alert',
                fg['button.volver_al_portal.error']
            );
        }
    }

    show_menus_sidebar() {
        if (!this.tokenError && !this.maintenance && !this.navigationError) {
            this.modulo_aplicaciones.show = false;
            this.menus.do_show();
        }
    }

    show_modulos_aplicaciones_sidebar() {
        if (!this.tokenError && !this.navigationError) {
            this.menus.show = false;
            this.modulo_aplicaciones.do_show();
        }
    }

    hideSidebar() {
        this.modulo_aplicaciones.show = false;
        this.menus.show = false;
    }

    private goto_correo() {
        window.open(
            this._config.get('SISTEMA.CORREO_UV')[
                this._config.get('SISTEMA.CORREO_UV.EN_USO')
            ],
            '_blank'
        );
    }

    private goto_cambiaclave() {
        window.open(this._config.get('SISTEMA.URL.CAMBIA_CLAVE'), '_blank');
    }

    private async logout() {
        var fg = await new Promise((t) => {
            this.translateService
                .get([
                    'usuario.logout',
                    'usuario.logout_msgs',
                    'primeng.accept',
                ])
                .subscribe((r) => t(r));
        });
        this.confirmationService.confirm({
            header: fg['usuario.logout'],
            message: fg['usuario.logout_msgs'],
            acceptLabel: fg['primeng.accept'],
            icon: 'pi pi-question-circle',
            key: 'logout',
            acceptButtonStyleClass: 'p-button-sm',
            rejectButtonStyleClass:
                'p-button-text p-button-secondary p-button-sm',
            accept: () => {
                window.sessionStorage.clear();
                window.location.replace(this._config.get('SISTEMA.URL.PORTAL'));
            },
        });
    }
}
