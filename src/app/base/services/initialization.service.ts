import { Injectable } from '@angular/core';

import { base_config } from '../config/globals';
import { icons_config } from '../config/icons';
import { project_config } from '../../project/config/globals';

declare var $: any;

@Injectable({
    providedIn: 'root',
})
export class InitializationService {
    private _config: Object = {};
    private _icons: Object = {};

    load(): Promise<any> {
        this._icons = Object.assign({}, icons_config);
        return new Promise((resolve, reject) => {
            $.extend(true, this._config, base_config, project_config);
            resolve(this._config);
        });
    }

    get(propPath?: any): any {
        if (propPath) {
            let props = propPath.split('.');
            let obj = JSON.parse(JSON.stringify(this._config));
            for (var i = 0; i < props.length; i++) {
                if (typeof obj[props[i]] == 'undefined') return undefined;
                obj = obj[props[i]];
            }
            return obj;
        } else return this._config;
    }

    getIcon(icon): any {
        if (this._icons.hasOwnProperty(icon)) return this._icons[icon];
        else return '';
    }
}
