import { Component, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as packagejson from '../../../../../package.json';
import { InitializationService } from '../../services/initialization.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    providers: [TranslateService],
})
export class FooterComponent {
    config = this._config.get();
    package = packagejson['default'];

    constructor(
        public injector: Injector,
        public translateService: TranslateService,
        public _config: InitializationService
    ) {}

    fecha = new Date();
}
