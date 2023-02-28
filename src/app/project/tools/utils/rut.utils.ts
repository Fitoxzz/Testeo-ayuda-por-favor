import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RutUtils {
    constructor() {}

    public getDV = (T) => {
        var M = 0,
            S = 1;
        for (; T; T = Math.floor(T / 10))
            S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
        return S ? S - 1 : 'k';
    };
}
