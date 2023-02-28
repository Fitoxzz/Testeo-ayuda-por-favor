import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InvocaService } from './invoca.service';
import { Usuario } from '../models/usuario';
import { InitializationService } from './initialization.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private user: Usuario;

    constructor(
        private config: InitializationService,
        private invoke: InvocaService,
        private http: HttpClient
    ) {}

    /**
     * Obtiene el token de sesión de usuario desde redis
     * @param idSesion --> uid proveniente desde la URL
     */
    async getSessionRedis(params?: any): Promise<any> {
        let session: any = await this.invoke.httpInvoke(
            'base/getKeyUser',
            params
        );
        window.sessionStorage.setItem('proyecto', session.proyecto);
        window.sessionStorage.setItem('modulo', session.modulo);
        window.sessionStorage.setItem('token', session.token);
    }

    async getUser(online: boolean): Promise<any> {
        var user: Usuario;

        var ip = await this.getIP(this.config.get('GET_IP.ACTIVE'));

        if (online) {
            if (window.sessionStorage.getItem('token')) {
                let r: any = await this.invoke.httpInvoke('base/getUser', null);

                let _name_profile = '';
                if (r.nombreCompleto != '') {
                    let _nombre_navbar = r.nombreCompleto.split(' ');
                    if (_nombre_navbar.length > 0) {
                        let counter = 0;
                        _nombre_navbar.forEach((e) => {
                            if (counter != 1) {
                                _name_profile = _name_profile + e + ' ';
                                counter++;
                            } else {
                                _name_profile = _name_profile + e + '<br/>';
                                counter = 0;
                            }
                        });
                    }
                }

                user = {
                    uid: r.rut.substring(0, r.rut.length - 2),
                    rut: r.rut,
                    nombres: r.nombres,
                    apellidos: r.apellidos,
                    nombre_completo: r.nombreCompleto,
                    correo_uv: r.correouv,
                    correo_personal: r.mail,
                    foto: new URL(
                        `${this.config.get('TUI.URL_FOTO')}${
                            r.foto
                        }${this.config.get('TUI.FORMATO_FOTO')}`
                    ).toString(),
                    idioma: r.idioma,
                    ip: ip,
                };
            } else {
                throw new Error('Sin token');
            }
        } else {
            user = {
                uid: '11111111',
                rut: '11111111-1',
                nombres: this.config.get('UV.NOMBRE'),
                apellidos: '',
                nombre_completo: this.config.get('UV.NOMBRE'),
                correo_uv: '',
                correo_personal: '',
                foto: new URL(
                    `${this.config.get(
                        'SISTEMA.URL.REPOSITORIO'
                    )}imagenes/iconos_sistemas/user/user_uv.png`
                ).toString(),
                idioma: this.config.get('SISTEMA.TRANSLATE.DEFAULT'),
                ip: ip,
            };
        }

        this.user = user;

        return user;
    }

    getUserOnline() {
        return this.user;
    }

    initGTAG(elementRef, activated) {
        if (activated) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = `https://www.googletagmanager.com/gtag/js?id=${environment.analytics}`;
            elementRef.nativeElement.appendChild(s);
        }
    }

    setGTAG(elementRef, activated, title, page) {
        if (activated) {
            var script = document.getElementById('g_analytics');
            if (script != null) script.remove();

            var s = document.createElement('script');
            s.id = 'g_analytics';
            s.type = 'text/javascript';

            var code = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${environment.analytics}', {
                    page_title: '${title}', 
                    page_path: '/${page}'}
                );
            `;

            s.append(code);
            elementRef.nativeElement.appendChild(s);
        }
    }

    async saveIdioma(idioma) {
        await this.invoke.httpInvoke('base/saveIdioma', {
            idioma: idioma,
        });
    }

    /**
     * Obtiene la IP publica y privada del usuario
     * publica == privada --> conexion externa
     * publica != privada --> conexion interna
     * @param active --> se obtendra o no la IP
     */
    private async getIP(active): Promise<any> {
        let out = { interna: false, publica: '', local: '' };
        if (active) {
            try {
                var publica = await new Promise(async (onsuccess, onerror) => {
                    this.http
                        .get(this.config.get('GET_IP.PUBLICA'), {
                            responseType: 'json',
                        })
                        .subscribe({
                            next: (response) => onsuccess(response),
                            error: (error) => onerror(error),
                        });
                });
                var local;
                var headerOpt = {
                    'Content-Type':
                        'application/x-www-form-urlencoded;charset=utf-8',
                };
                try {
                    local = await this.invoke.httpInvokeUrl(
                        this.config.get('GET_IP.LOCAL'),
                        {
                            publica: publica['ip'],
                        },
                        headerOpt
                    );
                } catch (f) {
                    local = await this.invoke.httpInvokeUrl(
                        this.config.get('GET_IP.LOCAL'),
                        {
                            publica: '',
                        },
                        headerOpt
                    );
                }
                out.local = local.local;
                out.interna = local.interna;

                return out;
            } catch (e) {
                return out;
            }
        } else return out;
    }
}
