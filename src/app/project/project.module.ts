import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';

//ROUTES
import { ProjectRoutingModule } from './routes/routing.module';

//MODULOS
import { PrimengModule } from './modules/primeng.module';
import { SharedComponentModule } from './modules/shared-component.module';

//COMPONENTS
import { HomeComponent } from './pages/home/home.component';
import { HomeMenuButtonsComponent } from '../base/components/home-menu-buttons/home-menu-buttons.component';
import { EvaluacionesComponent } from './pages/evaluaciones/evaluaciones.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { MostrarAlumnoComponent } from './pages/mostrar-alumno/mostrar-alumno.component';
import { FormComponent } from './pages/form/form.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { PasswordComponent } from './components/password/password.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { PhoneNumberComponent } from './components/phone-number/phone-number.component';
import { AlumnosporCarreraComponent } from './components/alumnospor-carrera/alumnospor-carrera.component';
import { IngresoPantallasComponent } from './pages/prueba-stats/Pantallas/ingreso-pantallas/ingreso-pantallas.component';
import { PruebaStatsComponent } from './pages/prueba-stats/prueba-stats.component';

@NgModule({
    declarations: [
        HomeComponent, 
        HomeMenuButtonsComponent, 
        EvaluacionesComponent, 
        FormularioComponent, 
        MostrarAlumnoComponent, 
        FormComponent, 
        CalendarioComponent, 
        PasswordComponent, 
        AutocompleteComponent, 
        PhoneNumberComponent, 
        AlumnosporCarreraComponent,
        IngresoPantallasComponent,
        PruebaStatsComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        AccordionModule,
        
        //MODULOS
        PrimengModule,
        SharedComponentModule,
        //ROUTES
        ProjectRoutingModule,
    ],
})
export class ProjectModule {}
