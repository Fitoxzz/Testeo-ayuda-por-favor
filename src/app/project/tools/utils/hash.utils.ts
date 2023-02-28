import { Injectable } from '@angular/core';

const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

@Injectable({
    providedIn: 'root',
})
export class HashUtils {
    constructor() {}

    generateHash(limit: number): string {
        var hash = '';
        var charactersLength = characters.length;
        for (let i = 0; i < limit; i++) {
            hash += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return hash;
    }
}
