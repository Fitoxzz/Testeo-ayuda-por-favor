import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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

@NgModule({
    declarations: [HomeComponent, HomeMenuButtonsComponent, EvaluacionesComponent, FormularioComponent],
    imports: [
        CommonModule,
        TranslateModule,
        //MODULOS
        PrimengModule,
        SharedComponentModule,
        //ROUTES
        ProjectRoutingModule,
    ],
})
export class ProjectModule {}
