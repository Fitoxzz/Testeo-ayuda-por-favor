import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InitializationService } from './initialization.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { timeout, retry, catchError } from 'rxjs';
import { InvokerUtils } from '../tools/utils/invoker.utils';

@Injectable({
    providedIn: 'root',
})
export class InvocaService {
    constructor(
        private config: InitializationService,
        private http: HttpClient,
        public translateService: TranslateService,
        private injector: Injector,
        private invokerUtils: InvokerUtils
    ) {}

    timeoutDF: number = this.config.get('SISTEMA.CONNECTION.TIMEOUT');
    retryDF: number = this.config.get('SISTEMA.CONNECTION.RETRY');

    async httpInvoke(
        serviceData:
            | string
            | { service: string; timeout?: number; retry?: number },
        params?: any
    ) {
        var p = await new Promise((onsucces, onerror) => {
            var service = this.invokerUtils.setServiceParams(
                serviceData,
                this.timeoutDF,
                this.retryDF
            );
            var router = this.injector.get(Router).url;

            this.http
                .post(
                    `${environment.backend}/${service.service}`,
                    'arg=' +
                        encodeURIComponent(
                            JSON.stringify(params == null ? {} : params)
                        ),
                    {
                        headers: this.invokerUtils.getHeaders(),
                    }
                )
                .pipe(
                    timeout(service.timeout),
                    retry(service.retry),
                    catchError((err) => {
                        throw err;
                    })
                )
                .subscribe({
                    next: (response) => {
                        try {
                            onsucces(
                                this.invokerUtils.processData(
                                    response,
                                    service,
                                    router
                                )
                            );
                        } catch (e) {
                            onerror(e);
                        }
                    },
                    error: (error) => {
                        onerror(
                            this.invokerUtils.errorHandler(
                                error,
                                service,
                                router
                            )
                        );
                    },
                });
        });
        return p;
    }

    async httpInvokeReport(
        serviceData:
            | string
            | { service: string; timeout?: number; retry?: number },
        format: string,
        params?: any
    ) {
        var p = await new Promise((onsucces, onerror) => {
            var service = this.invokerUtils.setServiceParams(
                serviceData,
                this.timeoutDF,
                this.retryDF
            );
            var router = this.injector.get(Router).url;
            var dataType = this.config.get('REPORT.TYPE')[format];

            this.http
                .post(
                    `${environment.backend}/${service.service}`,
                    'arg=' +
                        encodeURIComponent(
                            JSON.stringify(params == null ? {} : params)
                        ),
                    {
                        headers: this.invokerUtils.getHeadersReport(dataType),
                        responseType: 'blob' as 'blob',
                    }
                )
                .pipe(
                    timeout(service.timeout),
                    retry(service.retry),
                    catchError((err) => {
                        throw err;
                    })
                )
                .subscribe({
                    next: async (response) => {
                        try {
                            onsucces(
                                await this.invokerUtils.processReport(
                                    response,
                                    dataType,
                                    service,
                                    router
                                )
                            );
                        } catch (e) {
                            onerror(e);
                        }
                    },
                    error: (error) => {
                        onerror(
                            this.invokerUtils.errorHandler(
                                error,
                                service,
                                router
                            )
                        );
                    },
                });
        });
        return p;
    }

    async httpInvokeUrl(
        serviceData:
            | string
            | { service: string; timeout?: number; retry?: number },
        params?: any,
        headerOptions?: any
    ) {
        var p = await new Promise((onsucces) => {
            var service = this.invokerUtils.setServiceParams(
                serviceData,
                this.timeoutDF,
                this.retryDF
            );
            var router = this.injector.get(Router).url;

            this.http
                .post(
                    `${service.service}`,
                    'arg=' +
                        encodeURIComponent(
                            JSON.stringify(params == null ? {} : params)
                        ),
                    {
                        headers:
                            this.invokerUtils.getHeadersCustom(headerOptions),
                    }
                )
                .pipe(
                    timeout(service.timeout),
                    retry(service.retry),
                    catchError((err) => {
                        throw err;
                    })
                )
                .subscribe({
                    next: (response) => {
                        try {
                            onsucces(
                                this.invokerUtils.processData(
                                    response,
                                    service,
                                    router
                                )
                            );
                        } catch (e) {
                            onerror(e);
                        }
                    },
                    error: (error) => {
                        onerror(error);
                    },
                });
        });
        return p;
    }
}
