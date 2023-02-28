import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';

// GUARDS y RESOLVERS
import { AuthGuard } from './guards/auth.guard';

import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EvaluacionesComponent } from "../pages/evaluaciones/evaluaciones.component";
import { FormularioComponent } from '../pages/formulario/formulario.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'disabled' })],
    exports: [RouterModule],
})
export class ProjectRoutingModule {}
