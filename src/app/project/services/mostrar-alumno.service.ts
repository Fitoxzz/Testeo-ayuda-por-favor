import { Injectable } from '@angular/core';
import { InvocaService } from '../../base/services/invoca.service';

@Injectable({
  providedIn: 'root'
})
export class MostrarAlumnoService{

    constructor(
      private invoke: InvocaService,
      ) {}

      async alumnosSelecc(){
          return await this.invoke.httpInvoke("alumnosSelecc");
      }

  }
