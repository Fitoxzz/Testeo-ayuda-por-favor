import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'chile_money' })
export class ChileMoneyPipe implements PipeTransform {
    private THOUSANDS_SEPARATOR: string;

    constructor() {
        this.THOUSANDS_SEPARATOR = '.';
    }

    transform(value: number): string {
        let integer = (value || '0').toString();
        let salida = integer.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            this.THOUSANDS_SEPARATOR
        );
        salida = '$ ' + salida;
        return salida;
    }
}
