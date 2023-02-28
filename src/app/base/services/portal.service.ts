import { Injectable } from '@angular/core';
import { InvocaService } from './invoca.service';
import { DateUtils } from '../tools/utils/date.utils';

@Injectable({
    providedIn: 'root',
})
export class PortalService {
    date_utils = new DateUtils();

    constructor(private invoke: InvocaService) {}

    /**
     * Obtiene los avisos (alertas) del Portal por el cual ingreso
     */
    async getAvisos(): Promise<any> {
        try {
            let _avisos: any = await this.invoke.httpInvoke(
                'base/getAvisos',
                null
            );
            let avisos = [];

            for (let i = 0; i < _avisos.length; i++) {
                let r = _avisos[i];
                let data_aviso = r.mensaje.split('<CORTE>');
                var fecNum = r.fecha.split('/');

                avisos.push({
                    flag: i,
                    nombre: data_aviso[1],
                    anuncio: data_aviso[2],
                    fecha: this.date_utils.numberToDate(
                        parseInt(`${fecNum[2]}${fecNum[1]}${fecNum[0]}`)
                    ),
                });
            }

            return avisos;
        } catch (error) {
            return [];
        }
    }

    /**
     * Obtiene la url del modulo al cual viajar (se conserva el token)
     * @param idProyecto
     * @param codModulo
     */
    async gotoModule(params?: any): Promise<any> {
        let data: any = await this.invoke.httpInvoke('base/navigate', params);
        window.location.replace(data.url);
    }

    /**
     * Obtiene la url de la aplicacion al cual viajar (crea un nuevo token en redis)
     * @param idProyecto
     */
    async gotoApp(params?: any): Promise<any> {
        let data: any = await this.invoke.httpInvoke(
            'base/navigateApp',
            params
        );
        window.location.replace(data.url);
    }

    /**
     * Obtiene la url de la aplicacion por donde ingreso al modulo (se conserva el token)
     * @param idProyecto
     */
    async backToPortal(params?: any): Promise<any> {
        let data: any = await this.invoke.httpInvoke('base/getAppUrl', params);
        window.location.replace(data.url);
    }

    /**
     * Envia un correo de contacto a soporte@uv.cl
     */
    async sendContactMail(params?: any): Promise<any> {
        await this.invoke.httpInvoke('base/sendMail', params);
    }
}
