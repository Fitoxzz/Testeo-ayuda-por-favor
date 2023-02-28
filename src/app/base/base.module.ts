import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ErroresHandler } from './tools/handler/error/error.handler';

// Locales
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
registerLocaleData(localeEs);
registerLocaleData(localeEn);

//Modules
import { ProjectModule } from '../project/project.module';
import { BaseRoutingModule } from './routes/routing.module';
import { PrimengModule } from './modules/primeng.module';

//Services
import { InitializationService } from './services/initialization.service';
import { NgxSpinnerService } from 'ngx-spinner';

// SENTRY
import * as Sentry from '@sentry/angular';
import { BrowserTracing } from '@sentry/tracing';

//Traductor
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

//Pipes
import { NgxDatePipe } from './tools/pipes/ngx-date.pipe';
import { ChileMoneyPipe } from './tools/pipes/chile_money.pipe';
import { RutPipe } from './tools/pipes/rut.pipe';
import { SafePipe } from './tools/pipes/safe.pipe';
import { TruncateStringPipe } from './tools/pipes/truncate_string.pipe';

// Others
import { Ng9RutModule } from 'ng9-rut';
import { NgxSpinnerModule } from 'ngx-spinner';
import { environment } from '../../environments/environment';
import { NgIdleModule } from '@ng-idle/core';

//Components
import { BaseComponent } from './base.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactoComponent } from './components/header/contacto/contacto.component';
import { AvisosComponent } from './components/header/avisos/avisos.component';
import { ModuloAplicacionComponent } from './components/modulo-aplicacion/modulo-aplicacion.component';
import { SimbologiaComponent } from './components/header/simbologia/simbologia.component';
import { ProfileComponent } from './components/header/profile/profile.component';
import { MenusComponent } from './components/menus/menus.component';
import { ErrorComponent } from './pages/error/error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SessionComponent } from './pages/session/session.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { IdleHandlerComponent } from './tools/handler/idle/idle-handler.component';
import { DevelopComponent } from './pages/develop/develop.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';

Sentry.init({
    dsn: environment.sentry.dns,
    integrations: [
        new BrowserTracing({
            tracingOrigins: environment.sentry.tracingOrigins,
            routingInstrumentation: Sentry.routingInstrumentation,
        }),
    ],
    tracesSampleRate: 1.0,
});

@NgModule({
    declarations: [
        //Pipes
        NgxDatePipe,
        ChileMoneyPipe,
        RutPipe,
        SafePipe,
        TruncateStringPipe,
        //Components
        BaseComponent,
        HeaderComponent,
        FooterComponent,
        ContactoComponent,
        AvisosComponent,
        SimbologiaComponent,
        ProfileComponent,
        MenusComponent,
        ModuloAplicacionComponent,
        ErrorComponent,
        NotFoundComponent,
        SessionComponent,
        MaintenanceComponent,
        IdleHandlerComponent,
        DevelopComponent,
        BreadCrumbComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        ProjectModule,
        HttpClientModule,
        FormsModule,
        // Translate
        TranslateModule.forRoot({
            defaultLanguage: 'es',
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        // OTROS
        Ng9RutModule,
        NgxSpinnerModule,
        NgIdleModule.forRoot(),
        // MODULOS
        PrimengModule,
        // Routing Mantenerlo al final de la lista
        BaseRoutingModule,
    ],
    providers: [
        NgxDatePipe,
        {
            provide: ErrorHandler,
            useClass: ErroresHandler,
        },
        InitializationService,
        {
            provide: APP_INITIALIZER,
            useFactory: (config: InitializationService) => () => config.load(),
            deps: [InitializationService],
            multi: true,
        },
        NgxSpinnerService,
    ],
    bootstrap: [BaseComponent],
})
export class BaseModule {}

//Translate
export function createTranslateLoader(http: HttpClient) {
    return new MultiTranslateHttpLoader(http, [
        { prefix: './assets/i18n/base/', suffix: '.json' },
        { prefix: './assets/i18n/project/', suffix: '.json' },
    ]);
}
