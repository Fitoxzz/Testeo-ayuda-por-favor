import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class TranslateUtils {
    constructor(public translateService: TranslateService) {}

    async translate(words: string[], values?: any) {
        return await new Promise((t) => {
            this.translateService
                .get(words, values || {})
                .subscribe((r) => t(r));
        });
    }
}
