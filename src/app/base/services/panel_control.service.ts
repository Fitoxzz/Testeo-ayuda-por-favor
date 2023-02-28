import { Injectable } from '@angular/core';
import { InvocaService } from './invoca.service';
import { DateUtils } from '../tools/utils/date.utils';
import { Subject } from 'rxjs';
import { InitializationService } from './initialization.service';
import { CommonUtils } from '../tools/utils/common.utils';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PanelControlService {
    panelSubject = new Subject<object>();
    panel$ = this.panelSubject.asObservable();

    positionSubject = new Subject<object>();
    position$ = this.positionSubject.asObservable();

    private menusSubject = new Subject<object>();
    public menus$ = this.menusSubject.asObservable();
    private menus = [];

    private navigateSubject = new Subject<object>();
    public navigate$ = this.navigateSubject.asObservable();

    date_utils = new DateUtils();

    constructor(
        private config: InitializationService,
        private invoke: InvocaService,
        private commonUtils: CommonUtils
    ) {}

    async getAplicaciones(params?: any): Promise<any> {
        var apps: any = await this.invoke.httpInvoke(
            'base/getAplicaciones',
            params
        );

        apps =
            apps.map((e) => {
                return {
                    nombre: e.nombre,
                    id: e.id,
                    tipo: e.tipoApp,
                    grupo: e.grupoApp,
                    icono: `${this.config.get(
                        'SISTEMA.URL.REPOSITORIO'
                    )}${this.config.get('SISTEMA.URL.PATHAPPSIMG')}${e.imagen}`,
                };
            }) || [];

        var active = apps.find((e) => e.id === params.id_proyecto) || null;

        return { apps: apps, active: active };
    }

    async getModulos(params?: any): Promise<any> {
        var modulos: any = await this.invoke.httpInvoke(
            'base/getModulos',
            params
        );

        var output = {
            modulos: [],
            active: null,
            en_mantencion: false,
        };

        var grupos = [];

        modulos = modulos.filter((e) => e.nombre != 'Volver al Portal') || [];
        modulos =
            modulos.map((e) => {
                var icono = '';
                switch (e.moduloActivo) {
                    case 1: // NORMAL
                        icono = `${this.config.get(
                            'SISTEMA.URL.REPOSITORIO'
                        )}${this.config.get('SISTEMA.URL.PATHMODULOSIMG')}${
                            e.imagen
                        }.png`;
                        break;
                    case 2: // MANTENCION
                        icono = `${this.config.get(
                            'SISTEMA.URL.REPOSITORIO'
                        )}${this.config.get(
                            'SISTEMA.URL.PATHMODULOSIMG'
                        )}maintenance.png`;
                        break;
                    case 3: // DESARROLLO
                        icono = `${this.config.get(
                            'SISTEMA.URL.REPOSITORIO'
                        )}${this.config.get(
                            'SISTEMA.URL.PATHMODULOSIMG'
                        )}develop.png`;
                        break;
                }

                var modulo = {
                    nombre: e.nombre,
                    icono: icono,
                    estilo: e.estilo,
                    cod_modulo: e.id,
                    grupo: (e.grupo && e.grupo != ''
                        ? e.grupo
                        : 'OTROS'
                    ).toUpperCase(),
                    estado: e.moduloActivo,
                    descripcion: e.descripcion || '',
                };

                if (!grupos.includes(modulo.grupo)) grupos.push(modulo.grupo);

                if (
                    modulo.cod_modulo.toString() == params.codModulo.toString()
                ) {
                    output.active = modulo;
                    output.en_mantencion = modulo.estado == 2;
                }

                return modulo;
            }) || [];

        var otros = {
            grupo: null,
            modulos: [],
            grupo_activo: false,
        };
        grupos.map((e) => {
            var group = modulos.filter((f) => f.grupo === e) || [];
            if (group.length > 0) {
                var activo = false;
                if (output.active) {
                    var findActive = group.find(
                        (f) =>
                            f.cod_modulo.toString() ===
                            output.active.cod_modulo.toString()
                    );
                    if (findActive) activo = true;
                }

                switch (e) {
                    case 'OTROS':
                        otros = {
                            grupo: e,
                            modulos: group,
                            grupo_activo: activo,
                        };
                        break;
                    default:
                        output.modulos.push({
                            grupo: e,
                            modulos: group,
                            grupo_activo: activo,
                        });
                        break;
                }
            }
        });

        if (otros.modulos.length > 0) {
            output.modulos.push(otros);
        }

        return output;
    }

    async getMenus(params?: any): Promise<any> {
        var menus: any = await this.invoke.httpInvoke('base/getMenus', params);

        menus = menus.filter((e) => e.metodo != 'home') || [];
        menus =
            menus.map((e) => {
                var font = '',
                    icono = '';

                switch (e.menuActivo) {
                    case 1: // NORMAL
                        if (this.config.get('SISTEMA.MENUS.FLAT_ICONS')) {
                            icono = `${this.config.get(
                                'SISTEMA.URL.REPOSITORIO'
                            )}${this.config.get('SISTEMA.URL.PATHMENUSIMG')}${
                                e.iconoBootstrap
                            }.png`;
                            font = 'fa-solid fa-sign-in-alt';
                        } else {
                            icono = e.iconoBootstrap;
                        }
                        break;
                    case 2: // MANTENCION
                        if (this.config.get('SISTEMA.MENUS.FLAT_ICONS')) {
                            icono = `${this.config.get(
                                'SISTEMA.URL.REPOSITORIO'
                            )}${this.config.get(
                                'SISTEMA.URL.PATHMENUSIMG'
                            )}maintenance.png`;
                            font = 'fa-solid fa-cogs';
                        } else {
                            icono = 'fa-solid fa-cogs';
                        }
                        break;
                    case 3: // DESARROLLO
                        if (this.config.get('SISTEMA.MENUS.FLAT_ICONS')) {
                            icono = `${this.config.get(
                                'SISTEMA.URL.REPOSITORIO'
                            )}${this.config.get(
                                'SISTEMA.URL.PATHMENUSIMG'
                            )}develop.png`;
                            font = 'fa-solid fa-code';
                        } else {
                            icono = 'fa-solid fa-code';
                        }
                        break;
                }

                var menu = {
                    estado: e.menuActivo,
                    nombre: e.nombre,
                    icono: icono,
                    font: font,
                    estilo: true,
                    metodo: e.metodo,
                    descripcion: e.descripcion,
                    id: e.idMenu,
                    items: [],
                    local: false,
                };

                menu.items =
                    e.items.map((f) => {
                        var icon = '';
                        switch (f.itemActivo) {
                            case 1: // NORMAL
                                icon = `${this.config.get(
                                    'SISTEMA.URL.REPOSITORIO'
                                )}${this.config.get(
                                    'SISTEMA.URL.PATHITEMSIMG'
                                )}${f.iconoBootstrap}.png`;
                                break;
                            case 2: // MANTENCION
                                icon = `${this.config.get(
                                    'SISTEMA.URL.REPOSITORIO'
                                )}${this.config.get(
                                    'SISTEMA.URL.PATHMENUSIMG'
                                )}maintenance.png`;
                                break;
                            case 3: // DESARROLLO
                                icon = `${this.config.get(
                                    'SISTEMA.URL.REPOSITORIO'
                                )}${this.config.get(
                                    'SISTEMA.URL.PATHMENUSIMG'
                                )}develop.png`;
                                break;
                        }

                        return {
                            icono: icon,
                            estado: e.itemActivo,
                            metodo: e.metodo,
                            nombre: e.nombre,
                            descripcion: e.descripcion,
                        };
                    }) || [];

                return menu;
            }) || [];

        menus.unshift(this.getHomeMenu());

        if (!environment.production && environment.hasOwnProperty('menus')) {
            try {
                for (let i = 0; i < environment['menus'].length; i++) {
                    let e = environment['menus'][i];
                    let index = -1;
                    let obj;
                    index = menus.findIndex(
                        (f) => f.metodo === e.metodo && e.metodo != ''
                    );
                    obj = {
                        estado: e.estado,
                        nombre: `${e.nombre} (Local)`,
                        icono: e.icono,
                        font:
                            e.estado == 1
                                ? 'fa-solid fa-sign-in-alt'
                                : e.estado == 2
                                ? 'fa-solid fa-cogs'
                                : 'fa-solid fa-code',
                        estilo: true,
                        metodo: e.metodo,
                        descripcion: e.descripcion,
                        id: index !== -1 ? menus[index].id : menus.length + 1,
                        items: index !== -1 ? menus[index].items : [],
                        local: true,
                    };
                    if (index !== -1) menus[index] = obj;
                    else menus.push(obj);
                }
            } catch (e) {}
        }

        this.menus = this.commonUtils.mergeDeepArray(menus);
        this.menusSubject.next({ menus: this.menus });

        return menus;
    }

    public getMenusHome() {
        var out = this.commonUtils.mergeDeepArray(this.menus);
        out.map((r) => (r.estilo = true));
        return out;
    }

    getHomeMenu() {
        let img = this.config.get('SISTEMA.MENUS.FLAT_ICONS')
            ? `${this.config.get('SISTEMA.URL.REPOSITORIO')}${this.config.get(
                  'SISTEMA.URL.PATHMENUSIMG'
              )}home.png`
            : 'pi pi-home';

        return {
            estado: 1,
            nombre: 'Inicio',
            icono: img,
            estilo: '',
            metodo: '',
            descripcion: 'Inicio',
            id: 0,
            items: [],
            grupo: '',
        };
    }

    async getFechaActual(params?: any): Promise<any> {
        try {
            var { fechaActualNumber }: any = await this.invoke.httpInvoke(
                'base/getFechaActual',
                params
            );
            let json = this.date_utils.numberToJson(fechaActualNumber);
            return { json: json, date: this.date_utils.jsonToDate(json) };
        } catch (e) {
            return null;
        }
    }

    async navigate(router, menu, item?) {
        let maintenance = false,
            devop = false;

        if (menu.estado == 2) maintenance = true;
        if (menu.estado == 3) devop = true;

        if (!devop && !maintenance && item != null) {
            if (item.estado == 2) maintenance = true;
            if (item.estado == 3) devop = true;
        }

        var bread = this.setBreadcrumb(menu, item);
        var isNavigate = true;

        if (!devop) {
            if (!maintenance) {
                isNavigate = await router.navigate([
                    `/${menu.metodo}${item != null ? '/' + item.metodo : ''}`,
                ]);
            } else {
                isNavigate = await router.navigate([`/maintenance`], {
                    state: {
                        mode: 'menu',
                    },
                });
            }
        } else {
            isNavigate = await router.navigate([`/develop`]);
        }

        if (isNavigate) {
            this.navigateSubject.next({
                menu: menu,
                item: item,
                breadcrumb: bread,
                title: menu.nombre,
            });
            this.positionSubject.next({
                menu: menu,
                item: item,
            });
        }
    }

    async homeNavigate(router) {
        var home = this.getHomeMenu();
        var bread = this.setBreadcrumb(home, null);
        var isNavigate = await router.navigate([`/${home.metodo}`]);
        if (isNavigate) {
            this.navigateSubject.next({
                menu: home,
                item: null,
                breadcrumb: bread,
                title: '',
            });
            this.positionSubject.next({
                menu: home,
                item: null,
            });
        }
    }

    private setBreadcrumb(menu, item) {
        var breadCrumb = [];
        if (menu.metodo != '') {
            breadCrumb.push({ label: menu.nombre });
            if (item) breadCrumb.push({ label: item.nombre });
        }
        return breadCrumb;
    }
}
