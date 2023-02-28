import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare var $: any;

@Injectable({
    providedIn: 'root',
})
export class SystemService {
    constructor() {}

    private loadingSubject = new Subject<object>();
    loading$ = this.loadingSubject.asObservable();

    languajeSubject = new Subject<object>();
    languaje$ = this.languajeSubject.asObservable();

    offPreloader() {
        $('.preloader')
            .delay(1000)
            .fadeOut('slow', function () {
                $(this).remove();
            });
    }

    setLoading(active, options?) {
        let object = options != null ? options : {};
        object['active'] = active;
        this.loadingSubject.next(object);
    }

    downloadReport(report: Blob, filename: string) {
        let dwldLink = document.createElement('a');
        let url = URL.createObjectURL(report);

        let isSafariBrowser =
            navigator.userAgent.indexOf('Safari') != -1 &&
            navigator.userAgent.indexOf('Chrome') == -1;

        if (isSafariBrowser) {
            dwldLink.setAttribute('target', '_blank');
        }

        dwldLink.setAttribute('href', url);
        dwldLink.setAttribute('download', filename);
        dwldLink.style.visibility = 'hidden';
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
        window.URL.revokeObjectURL(url);
    }

    visorPDF(id, src, height, width) {
        var s = document.createElement('iframe');
        s.src = URL.createObjectURL(src);
        s.height = height;
        s.width = width;

        var div = document.createElement('div');

        let container = document.getElementById(id);
        container.innerHTML = null;
        container.appendChild(div);
        container.appendChild(s);
    }

    filtering(array, paramFilter, paramCompare) {
        let tmp = array;
        if (paramFilter != '') {
            tmp =
                array.filter((e) => {
                    let a = e[paramCompare]
                        .trim()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toUpperCase();
                    let b = paramFilter
                        .trim()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toUpperCase();
                    if (a.includes(b)) return e;
                }) || [];
        }
        return tmp;
    }
}
