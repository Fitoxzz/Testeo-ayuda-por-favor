import { Component, OnInit } from '@angular/core';
import { MostrarAlumnoService } from '../../services/mostrar-alumno.service';
import { InvocaService } from '../../../base/services/invoca.service';
import { SystemService } from '../../../base/services/system.service';
import { ErroresHandler } from '../../../base/tools/handler/error/error.handler';

@Component({
  selector: 'app-mostrar-alumno',
  templateUrl: './mostrar-alumno.component.html',
  styleUrls: ['./mostrar-alumno.component.css']
})
export class MostrarAlumnoComponent{
    constructor(
        private MostrarAlumnoService: MostrarAlumnoService,
        private SystemServicervice: SystemService,
        private ErroresHandlerr: ErroresHandler
        ){}

    alumnos: any =  [];

    async alumnosSelecc(){  // ASIGNAMOS NOMBRE A LA FUNCION
        try {               // TRY Y CATCH PARA CAPTURAR EL ERROR E INTENTAR DAR LA DATA

            this.SystemServicervice.setLoading(true);
            this.alumnos = await this.MostrarAlumnoService.alumnosSelecc();
            console.log(this.alumnos);
            this.SystemServicervice.setLoading(false);
        } catch (e) {
            this.ErroresHandlerr.processError(e, "alert", "error, revisa aqui")
        }
    }
}
