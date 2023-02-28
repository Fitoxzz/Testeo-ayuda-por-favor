import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';

export class ErrorD {
    private error: Error;
    private name: string = '';
    private type: string = '';
    private level: string = '';
    private server: string = '';
    private service: string = '';
    private router: string = '';
    private trace: string = '';
    private message: string = '';
    private timeout: number = 0;
    private retry: number = 0;
    private isToken: boolean = false;
    private sentryLog: boolean = false;
    private notifyMethod: string = '';
    private layer: string = '';
    private status: number = 0;

    constructor(data: any, router: string, server?: string, dataService?: any) {
        var impact = this.setImpact(data);
        this.type = impact.type;
        this.level = impact.level;
        this.layer = impact.layer;
        this.message = data.message;
        this.server = server;
        this.router = router;
        this.timeout = dataService?.timeout;
        this.retry = dataService?.retry;
        this.service = dataService?.service;
        try {
            this.error = new Error(data.message);

            if (data instanceof TimeoutError) {
                // TIMEOUT (TIMEOUT)
                this.status = 408;
                this.name = data.name;
                this.trace = data.stack;
            } else if (data instanceof HttpErrorResponse) {
                // SERVER (CRITICAL)
                this.status = 500;
                this.name = data.statusText;
            } else if (!(data instanceof Error)) {
                // BACKEND (ERROR - FATAL)
                this.status = 400;
                var trace =
                    data.trace == undefined
                        ? ''
                        : data.trace instanceof Object
                        ? data.trace
                        : data.trace.split('\n');

                this.error.stack = trace;

                this.name = dataService?.service;
                this.trace = trace;
                this.isToken = this.isSessionError(
                    this.error.name,
                    this.error.stack
                );
            } else {
                // FRONTEND (CLIENT)
                this.status = 400;
                this.error = data;
                this.name = data.name;
                this.trace = data.stack;
            }
        } catch (e) {
            this.status = 400;
            this.error = e;
            this.name = e.name;
            this.trace = e.stack;
            this.message = e.message;
        }
    }

    getError(): Error {
        return this.error;
    }

    getContext(): any {
        return {
            name: this.name,
            trace: this.trace,
            message: this.message,
            isToken: this.isToken,
            server: this.server,
            router: this.router,
            timeout: this.timeout,
            retry: this.retry,
            level: this.level,
            layer: this.layer,
            type: this.type,
            service: this.service,
            sentryLog: this.sentryLog,
            notifyMethod: this.notifyMethod,
            status: this.status,
        };
    }

    setCustomMessage(msgs: string) {
        this.message = msgs;
    }

    setSentryLog() {
        this.sentryLog = true;
    }

    setNotifyMethod(notifyMethod: string) {
        this.notifyMethod = notifyMethod;
    }

    //// PRIVATE METHODS

    private isSessionError(message: string, trace: any): boolean {
        var msgs = `${message}${trace.toString()}`;
        var out = [
            'tokenError',
            'JsonWebTokenError',
            'Datos de sesión',
            'parámetro idSesion',
            'jwt expired',
        ].some((i) => msgs.toString().includes(i));
        return out;
    }

    private setImpact(data: any): any {
        var p = { type: null, level: null, layer: null };
        if (data instanceof TimeoutError) {
            p.type = 'TIMEOUT';
            p.level = 'BACKEND';
            p.layer = 'SERVER';
        } else if (data instanceof HttpErrorResponse) {
            p.type = 'RESPONSE';
            p.level = 'BACKEND';
            p.layer = 'SERVER';
        } else if (!(data instanceof Error)) {
            p.type = data.type;
            p.level = data.level;
            p.layer = 'SERVER';
        } else {
            p.type = 'CODE';
            p.layer = 'CLIENT';
        }
        return p;
    }
}
