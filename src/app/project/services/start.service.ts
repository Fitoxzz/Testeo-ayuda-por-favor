import { Injectable } from '@angular/core';
import { InvocaService } from '../../base/services/invoca.service';
import { TranslateUtils } from 'src/app/base/tools/utils/translate.utils';

@Injectable({
    providedIn: 'root',
})
export class StartService {
    constructor(
        private invoke: InvocaService,
        private translateUtils: TranslateUtils
    ) {}
    private output = null;

    async startServices() {
        try {
            this.output = this.setTemplate();
        } catch (e) {
            this.output = null;
            var t = await this.translateUtils.translate([
                'datosIniciales.error',
            ]);
            throw { error: e, msgs: t['datosIniciales.error'] };
        }
    }

    private setTemplate() {
        return {};
    }

    public getOutput() {
        return this.output;
    }
}
