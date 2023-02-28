import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate_string' })
export class TruncateStringPipe implements PipeTransform {
    private DEFAULT_NAME: string;

    constructor() {
        this.DEFAULT_NAME = 'nombre sistema';
    }

    transform(value: string, tope: number): string {
        if (value == null || value == '') {
            return this.DEFAULT_NAME;
        } else {
            if (value.length > tope) {
                return value.substring(0, tope - 1) + ' ...';
            } else {
                return value;
            }
        }
    }
}
