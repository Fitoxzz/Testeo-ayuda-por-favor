import { Component, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { UsuarioService } from './services/usuario.service';
import { ErroresHandler } from './tools/handler/error/error.handler';
import { PanelControlService } from './services/panel_control.service';
import { SystemService } from './services/system.service';
import { InitializationService } from './services/initialization.service';
import { StartService } from '../project/services/start.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SentryService } from './services/sentry.service';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css'],
})
export class BaseComponent {
    config = this._config.get();
    user: any;
    title = this._config.get('SISTEMA.NOMBRE');

    loading = {
        msgs: this._config.get('SISTEMA.NOMBRE'),
    };

    constructor(
        public elementRef: ElementRef,
        private spinner: NgxSpinnerService,
        private _config: InitializationService,
        private router: Router,
        private usuarioService: UsuarioService,
        public translateService: TranslateService,
        private primengConfig: PrimeNGConfig,
        private erroresHandler: ErroresHandler,
        private messageService: MessageService,
        private panelControlService: PanelControlService,
        private systemService: SystemService,
        private titleService: Title,
        private startService: StartService,
        private sentryService: SentryService
    ) {}

    async ngOnInit() {
        this.primengConfig.ripple = true;
        try {
            this.setTranslation();
            this.setSubscribes();

            this.usuarioService.initGTAG(
                this.elementRef,
                this._config.get('MONITORING_TRACING.GOOGLE_ANALYTICS.ACTIVO')
            );

            await this.getSession(window.location.href);
            await this.startService.startServices();
            await this.panelControlService.homeNavigate(this.router);

            this.systemService.offPreloader();
        } catch (e) {
            this.erroresHandler.processError(e.error, 'page', e.msgs);
            this.systemService.offPreloader();
        }
    }

    private async getSession(url) {
        try {
            if (this._config.get('SISTEMA.LOGIN')) {
                if (window.sessionStorage.getItem('token') == null) {
                    window.sessionStorage.clear();
                    let uid = url.split('?uid=')[1];
                    if (uid != undefined && uid != null && uid != '') {
                        await this.usuarioService.getSessionRedis({
                            idSesion: uid,
                        });
                        window.history.replaceState('', '', '');
                    } else {
                        window.location.replace(
                            this._config.get('SISTEMA.URL.PORTAL')
                        );
                    }
                }
            }

            this.user = await this.usuarioService.getUser(
                this._config.get('SISTEMA.LOGIN')
            );
            this.sentryService.user = this.user;

            this.translateService.use(
                this.user != null
                    ? this.user.idioma
                    : this._config.get('SISTEMA.TRANSLATE.DEFAULT')
            );
            this.translateService.get('primeng').subscribe((res) => {
                this.primengConfig.setTranslation(res);
            });
        } catch (e) {
            this.user = null;
            this.translateService
                .get(['usuario.profile.error'])
                .subscribe((r) => {
                    throw { error: e, msgs: r['usuario.profile.error'] };
                });
        }
    }

    private googleAnalytics(gtag) {
        this.usuarioService.setGTAG(
            this.elementRef,
            this._config.get('MONITORING_TRACING.GOOGLE_ANALYTICS.ACTIVO'),
            gtag.metodo,
            gtag.page
        );
    }

    private setTitlePage(position?) {
        this.titleService.setTitle(
            this.title + (position ? ` - ${position}` : '')
        );
    }

    private setTranslation() {
        this.translateService.setDefaultLang(
            this._config.get('SISTEMA.TRANSLATE.DEFAULT')
        );
        if (this._config.get('SISTEMA.TRANSLATE.ACTIVO')) {
            let tmp = [];
            this._config.get('SISTEMA.TRANSLATE.IDIOMAS').forEach((e) => {
                tmp.push(e.value);
            });
            this.translateService.addLangs(tmp);
        } else {
            this.translateService.addLangs([
                this._config.get('SISTEMA.TRANSLATE.DEFAULT'),
            ]);
        }
        this.translateService.use(
            this._config.get('SISTEMA.TRANSLATE.DEFAULT')
        );
    }

    private setSubscribes() {
        // NGX SPINNER: LOADING EFFECT
        this.systemService.loading$.subscribe(async (res: any) => {
            var fg = await new Promise((t) => {
                this.translateService.get(['loading']).subscribe((r) => t(r));
            });

            if (res.active) {
                this.loading.msgs = res.hasOwnProperty('msgs')
                    ? res.msgs
                    : fg['loading'];
                this.spinner.show(undefined, {
                    bdColor: res.hasOwnProperty('bdColor')
                        ? res.bdColor
                        : this._config.get('LOADING.bdColor'),
                    color: res.hasOwnProperty('color')
                        ? res.color
                        : this._config.get('LOADING.color'),
                    size: 'medium',
                    fullScreen: true,
                });
            } else this.spinner.hide();
        });

        // ERRORHANDLER: ALERT
        this.erroresHandler.error$.subscribe((res: any) => {
            this.messageService.add(res);
        });

        // NOMBRE DEL SITIO
        var sitename = this.panelControlService.panel$.subscribe((res: any) => {
            this.title =
                res.module != undefined
                    ? res.module.nombre
                    : this._config.get('SISTEMA.NOMBRE');
            sitename.unsubscribe();
        });

        // NAVIGATE
        this.panelControlService.navigate$.subscribe((res: any) => {
            this.googleAnalytics({
                metodo: `/${res.menu.metodo}`,
                page: res.menu.nombre,
            });
            this.setTitlePage(res.title);
        });

        // ROUTER HANDLER
        this.router.events
            .pipe(filter((event) => event instanceof NavigationStart))
            .subscribe(() => {
                var extras = this.router.getCurrentNavigation()?.extras;
                (extras || {}).skipLocationChange = this._config.get(
                    'SISTEMA.ROUTING.SKIPLOCATIONCHANGE'
                );
            });
    }
}
