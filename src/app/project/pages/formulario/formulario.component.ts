import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../../base/services/system.service';
import { ErroresHandler } from '../../../base/tools/handler/error/error.handler';
import { FormularioService } from '../../services/formulario.service';
import { InvocaService } from '../../../base/services/invoca.service';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
    constructor (
        private InvocaService: InvocaService,
        private FormularioService: FormularioService,
        private SystemServicevice: SystemService,
        private ErroresHandler: ErroresHandler,

        ){}

        params:any = {
            rut:""
        }
        public alumno:any

    async getDatos(){
        this.alumno = await this.FormularioService.getDatosAlumno(this.params)
        console.log(this.alumno)
        return(this.alumno)
    }
}
