import { Component, OnInit, Input } from '@angular/core';
import { CapacitacionService } from '../../services/capacitacion.service';
import { SystemService } from '../../../base/services/system.service';
import { ErroresHandler } from '../../../base/tools/handler/error/error.handler';
@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css']
})
export class EvaluacionesComponent {
    @Input() filtrar = true;

  constructor(
    private CapacitacionService: CapacitacionService,
    private SystemService: SystemService,
    private ErroresHandler: ErroresHandler

    ) {}

    facultades: any = [];
    textArea:string = '';
    cc: string;

    async getFacultades(){  // FUNCION PARA CONTROLAR ERROR
        try {
            this.SystemService.setLoading(true);
            this.facultades = await this.CapacitacionService.getFacultades();
            console.log(this.facultades);
            this.SystemService.setLoading(false);

        } catch (e) {
            this.ErroresHandler.processError(e, "alert", "Hubo un error al traer las facultades", "Evaluaciones");
        }
    }
}
