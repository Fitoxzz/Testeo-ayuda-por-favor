import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';

// GUARDS y RESOLVERS
import { AuthGuard } from './guards/auth.guard';

import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EvaluacionesComponent } from "../pages/evaluaciones/evaluaciones.component";
import { FormularioComponent } from '../pages/formulario/formulario.component';
import { MostrarAlumnoComponent } from '../pages/mostrar-alumno/mostrar-alumno.component';
import { FormComponent } from '../pages/form/form.component';
import { AlumnosporCarreraComponent } from '../components/alumnospor-carrera/alumnospor-carrera.component';
import { PruebaStatsComponent } from '../pages/prueba-stats/prueba-stats.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        // canActivate: [AuthGuard],
    },
    {
        path: 'evaluacion',
        component: EvaluacionesComponent,
    },
    {
        path: 'parcial',
        component: FormularioComponent,
    },
    {
        path: 'examen',
        component: MostrarAlumnoComponent,
    },
    {
        path: 'final',
        component: FormComponent,
    },
    {
        path: 'estadistica',
        component: AlumnosporCarreraComponent,
    },
    {
        path: 'cierre',
        component: PruebaStatsComponent,

    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'disabled' })],
    exports: [RouterModule],
})
export class ProjectRoutingModule {}
