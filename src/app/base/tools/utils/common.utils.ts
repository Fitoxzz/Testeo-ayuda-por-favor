import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CommonUtils {
    constructor() {}

    public getObjectArray(array, attrArray, atribute) {
        let obt = array.find((e) => e[attrArray] === atribute);
        return obt;
    }

    public getObjectsFromArray(array, attrArray, atribute) {
        let obt = array.filter((e) => e[attrArray] === atribute);
        return obt || [];
    }

    public findIndex(array, attrArray, atribute) {
        let i = array.findIndex((e) => e[attrArray] === atribute);
        return i;
    }

    public removeObjectsFromArray(array, attrArray, atribute) {
        array = array.filter((e) => e[attrArray] !== atribute);
        return array;
    }

    public simpleCloneObjAsign(object) {
        return Object.assign({}, object);
    }

    public simpleCloneJSON(object) {
        return JSON.parse(JSON.stringify(object));
    }

    public mergeDeep = (target, ...sources) => {
        if (!sources.length) return target;
        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (source[key] instanceof Date) {
                        Object.assign(target, { [key]: source[key] });
                    } else {
                        if (!target[key]) Object.assign(target, { [key]: {} });
                        this.mergeDeep(target[key], source[key]);
                    }
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
        return this.mergeDeep(target, ...sources);
    };

    public mergeDeepArray = (array) => {
        let cloned = array.map((item) =>
            Array.isArray(item) ? this.mergeDeepArray(item) : item
        );
        return cloned;
    };

    private isObject = (item) => {
        return item && typeof item === 'object' && !Array.isArray(item);
    };

    public highlight(data, param) {
        return data != null
            ? data.replace(
                  new RegExp(param, 'gi'),
                  (match) => `<mark>${match}</mark>`
              )
            : null;
    }
}
