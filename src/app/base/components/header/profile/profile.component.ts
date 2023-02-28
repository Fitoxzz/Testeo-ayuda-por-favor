import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { InitializationService } from '../../../services/initialization.service';
import { SystemService } from '../../../services/system.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ErroresHandler } from '../../../tools/handler/error/error.handler';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
    config = this._config.get();

    @Input() user: any;
    showDialog = false;

    constructor(
        private _config: InitializationService,
        public translateService: TranslateService,
        private messageService: MessageService,
        private systemService: SystemService,
        private usuarioService: UsuarioService,
        private erroresHandler: ErroresHandler
    ) {}

    combo_idiomas = [];
    idioma_selected = null;

    anonUser = !this._config.get('SISTEMA.LOGIN');

    show_profile() {
        this.combo_idiomas = [];
        this.translateService.getLangs().forEach((e) => {
            this._config.get('SISTEMA.TRANSLATE.IDIOMAS').forEach((f) => {
                if (e == f.value)
                    this.combo_idiomas.push({ label: f.label, value: e });
            });
            if (e == this.translateService.currentLang)
                this.idioma_selected = e;
        });
        this.showDialog = true;
    }

    async change_idioma(event) {
        try {
            this.systemService.setLoading(true);
            this.translateService.use(event.value);
            var fg = await new Promise((t) => {
                this.translateService
                    .get(['idioma.summary', 'idioma.detail'])
                    .subscribe((r) => t(r));
            });
            this.systemService.languajeSubject.next(null);
            this.messageService.add({
                severity: 'success',
                summary: fg['idioma.summary'],
                detail: fg['idioma.detail'],
                key: 'idioma',
            });
            this.usuarioService.getUserOnline().idioma = event.value;
            if (this._config.get('SISTEMA.LOGIN'))
                await this.usuarioService.saveIdioma(event.value);
            this.systemService.setLoading(false);
        } catch (e) {
            this.erroresHandler.processError(e, 'none');
        }
    }
}
