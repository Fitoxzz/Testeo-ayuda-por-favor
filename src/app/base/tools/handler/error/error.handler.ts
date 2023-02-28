import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ErrorD } from '../../../models/error';
import { InitializationService } from '../../../services/initialization.service';
import { environment } from '../../../../../environments/environment';
import { SystemService } from '../../../services/system.service';
import { SentryService } from 'src/app/base/services/sentry.service';

const noHandler = 'Uncaught (in promise): ErrorD:';
const notifyMethods = ['page', 'alert'];
const notifyMethodDefault = 'page';

@Injectable({
    providedIn: `root`,
})
export class ErroresHandler implements ErrorHandler {
    constructor(
        private injector: Injector,
        private ngZone: NgZone,
        private config: InitializationService,
        private systemService: SystemService,
        private sentryService: SentryService
    ) {}

    private errorSubject = new Subject<object>();
    error$ = this.errorSubject.asObservable();

    async handleError(error: any | ErrorD): Promise<void> {
        this.systemService.setLoading(false);
        if (!environment.production) console.log(error);

        var err: ErrorD = this.verifyError(error);
        var errorContext = err.getContext();

        if (!errorContext.sentryLog) {
            this.sentryService.captureException(err);
        }
        if (errorContext.notifyMethod === 'page') {
            this.ngZone.run(() => {
                this.injector
                    .get(Router)
                    .navigate([errorContext.isToken ? '/session' : '/error'], {
                        state: errorContext,
                    })
                    .then();
            });
        }
    }

    processError(
        error,
        notifyMethod: string,
        message?: string,
        summary?: string
    ) {
        var err: ErrorD = this.verifyError(error);
        var errorContext = err.getContext();

        if (!errorContext.isToken) {
            var isValidMethod = notifyMethods.includes(notifyMethod);
            err.setNotifyMethod(
                isValidMethod ? notifyMethod : notifyMethodDefault
            );

            if (message) err.setCustomMessage(message);

            if (isValidMethod) {
                this.notifyError(notifyMethod, err, summary);
            } else {
                this.notifyError(notifyMethodDefault, err, summary);
            }

            if (
                this.config.get('MONITORING_TRACING.HANDLE_ERROR.CONSOLE_LOG')
            ) {
                this.showLog(err);
            }
        } else {
            this.errorSubject.next({ token: true });
        }

        this.handleError(err);
    }

    private verifyError(error: any | ErrorD) {
        var err: ErrorD = error;
        if (!(error instanceof ErrorD)) {
            err = new ErrorD(error, this.injector.get(Router).url);
        }
        return err;
    }

    private notifyError(notifyMethod: string, error: ErrorD, summary?: string) {
        var errorContext = error.getContext();
        switch (notifyMethod) {
            case 'page':
                this.errorSubject.next({ navigation: true });
                break;
            case 'alert':
                var toast = {
                    severity: 'error',
                    key: 'main',
                    sticky: true,
                    detail: errorContext.message,
                };
                if (summary) toast['summary'] = summary;
                this.errorSubject.next(toast);
                break;
        }
    }

    private showLog(err: ErrorD) {
        var errContext = err.getContext();
        console.error(
            'status:',
            errContext.status,
            '\npath:',
            errContext.router,
            '\ntype:',
            errContext.type,
            '\nmessage:',
            err.getError().message,
            '\nerror:',
            err.getError()
        );
    }
}
