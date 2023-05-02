import { Component, OnInit, Input } from '@angular/core';
import { SystemService } from '../../../base/services/system.service';
import { AlumosporCarreraService } from '../../services/alumospor-carrera.service';
import { ErroresHandler } from '../../../base/tools/handler/error/error.handler';

@Component({
  selector: 'app-alumnospor-carrera',
  templateUrl: './alumnospor-carrera.component.html',
  styleUrls: ['./alumnospor-carrera.component.css']
})
export class AlumnosporCarreraComponent {
  @Input() dataEntrante: any;

  constructor(
    private SystemService: SystemService,
    private Al: AlumosporCarreraService,
    private ErroresHandler: ErroresHandler,

    ) {this.data}

  data: any;

  async getTotalAlumnos() {  // ASIGNAMOS NOMBRE A LA FUNCION 
      try {
          this.SystemService.setLoading(true);
          this.data = await this.Al.getTotalAlumnos();
          console.log(this.data);
          this.SystemService.setLoading(false);
          return (this.data);

      } catch (e) {
          this.ErroresHandler.processError(e, "alert", "Hubo un error al traer los alumnos", "examen");
      }
  }
}
