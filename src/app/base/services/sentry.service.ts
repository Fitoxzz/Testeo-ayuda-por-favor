import { Injectable } from '@angular/core';
import { InitializationService } from './initialization.service';
import { Usuario } from '../models/usuario';
import { ErrorD } from '../models/error';
import * as Sentry from '@sentry/angular';

@Injectable({
    providedIn: 'root',
})
export class SentryService {
    constructor(private config: InitializationService) {}

    user: Usuario;

    captureException(error: ErrorD) {
        try {
            var errorContext = error.getContext();
            if (
                this.config.get('MONITORING_TRACING.SENTRY.ACTIVO') &&
                !errorContext.isToken
            ) {
                var scope = new Sentry.Scope();

                var c = Object.assign({}, errorContext);
                delete c.notifyMethod;
                delete c.sentryLog;
                delete c.isToken;

                scope.setTransactionName(c.name);
                scope.setLevel(this.setLevel(c));
                scope.setTag('level', c.level);
                scope.setTag('type', c.type);
                scope.setContext('Cuenta UV', {
                    nombre: this.user.nombre_completo,
                    rut: this.user.rut,
                    correoUV: this.user.correo_uv,
                });
                scope.setContext('Error DTIC', c);
                Sentry.captureException(error.getError(), scope);
            }
        } catch (e) {
            console.error('Hubo un error al registrar Sentry Log.');
        }
    }

    private setLevel(errorContext: any) {
        if (errorContext.layer === 'SERVER') {
            if (
                errorContext.level === 'BACKEND' ||
                errorContext.type === 'FATAL'
            ) {
                return 'fatal';
            } else {
                return 'error';
            }
        } else {
            return 'warning';
        }
    }
}
