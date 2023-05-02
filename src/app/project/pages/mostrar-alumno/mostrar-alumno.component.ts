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
export class MostrarAlumnoComponent {
    constructor(
        private MostrarAlumnoService: MostrarAlumnoService,
        private SystemService: SystemService,
        private ErroresHandler: ErroresHandler,
    ) { }

    alumnos: any;

    async alumnoSelecc() {  // ASIGNAMOS NOMBRE A LA FUNCION 
        try {
            this.SystemService.setLoading(true);
            this.alumnos = await this.MostrarAlumnoService.alumnoSelecc();
            console.log(this.alumnos);
            this.SystemService.setLoading(false);
            return (this.alumnos);

        } catch (e) {
            this.ErroresHandler.processError(e, "alert", "Hubo un error al traer los alumnos", "examen");
        }
    }
}
