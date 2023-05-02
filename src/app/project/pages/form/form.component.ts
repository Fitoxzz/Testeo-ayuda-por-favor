import { Component, OnInit } from '@angular/core';
import { InvocaService } from '../../../base/services/invoca.service';
import { ErroresHandler } from '../../../base/tools/handler/error/error.handler';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  params: any = {
    nombre: "",
    apellido: "",
    correo: "",
    rut:"",
    dv:"",
    telefono: "",
  };
  public datos: any;

  constructor(
    private InvocaService: InvocaService,
    private ErroresHandler: ErroresHandler,
    private FormService: FormService,

  ) { }

  async datosFormulario() {

    this.datos = await this.FormService.datosFormulario(this.params);
    console.log(this.datos);
    
  
  }


}
