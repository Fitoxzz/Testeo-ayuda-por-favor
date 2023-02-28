import { Injectable } from '@angular/core';
import { ErrorD } from '../../models/error';
import { environment } from '../../../../environments/environment';
import { SentryService } from '../../services/sentry.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class InvokerUtils {
    constructor(
        private sentryService: SentryService,
        private translateService: TranslateService
    ) {}

    errorHandler(error: any, service: any, router: string): ErrorD {
        var errorDTIC: ErrorD = error;
        if (!(errorDTIC instanceof ErrorD)) {
            errorDTIC = new ErrorD(error, router, environment.backend, service);
            this.sentryService.captureException(errorDTIC);
            errorDTIC.setSentryLog();
        }
        return errorDTIC;
    }

    setServiceParams(
        serviceData: string | any,
        timeoutDF: number,
        retryDF: number
    ) {
        var data = {
            service: null,
            timeout: timeoutDF,
            retry: retryDF,
        };

        if (typeof serviceData === 'string') {
            data.service = serviceData;
        } else {
            if (data.hasOwnProperty('service'))
                data.service = serviceData.service;
            if (data.hasOwnProperty('timeout') && !isNaN(serviceData.timeout))
                data.timeout = serviceData.timeout;
            if (data.hasOwnProperty('retry') && !isNaN(serviceData.retry))
                data.retry = serviceData.retry;
        }
        return data;
    }

    processData(response: any, service: any, router: string) {
        if (response.status == 'OK') {
            return response.data;
        } else {
            throw this.errorHandler(response.error, service, router);
        }
    }

    async processReport(
        response: any,
        dataType: string,
        service: any,
        router: string
    ) {
        if (!response.type.includes('json')) {
            return new Blob([response], {
                type: `${dataType}; charset=utf-8`,
            });
        } else {
            var t = await new Promise((t) => {
                this.translateService
                    .get([`system_handler.report.text`], {
                        val: service.service,
                    })
                    .subscribe((r) => t(r));
            });
            throw this.errorHandler(
                new Error(t[`system_handler.report.text`]),
                service,
                router
            );
        }
    }

    getHeaders(): HttpHeaders {
        return new HttpHeaders()
            .set(
                'Content-Type',
                'application/x-www-form-urlencoded;charset=utf-8'
            )
            .set(
                'Authorization',
                window.sessionStorage.getItem('token') == null
                    ? ''
                    : window.sessionStorage.getItem('token')
            );
    }

    getHeadersReport(dataType: string): HttpHeaders {
        var header: HttpHeaders = this.getHeaders();
        header.set('Accept', dataType);
        return header;
    }

    getHeadersCustom(options?: any): HttpHeaders {
        var header: HttpHeaders = new HttpHeaders();
        if (options) {
            for (const k in options) {
                header.set(k, options[k]);
            }
        }
        return header;
    }
}
