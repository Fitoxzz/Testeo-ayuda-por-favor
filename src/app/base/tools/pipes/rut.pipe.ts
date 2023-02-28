import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rut' })
export class RutPipe implements PipeTransform {
    constructor() {}

    transform(rut): string {
        typeof rut === 'string'
            ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
            : '';

        if (rut.includes('-')) {
            rut = rut.replace(/-/g, '');
        }

        let result = `${rut.slice(-4, -1)}-${rut.substr(rut.length - 1)}`;
        for (let i = 4; i < rut.length; i += 3) {
            result = rut.slice(-3 - i, -i) + '.' + result;
        }

        return result;
    }
}
