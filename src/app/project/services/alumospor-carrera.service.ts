import { Injectable } from '@angular/core';
import { InvocaService } from '../../base/services/invoca.service';

@Injectable({
  providedIn: 'root'
})
export class AlumosporCarreraService {

  constructor(
    private invoke: InvocaService,
  
  ) {

   }
   async getTotalAlumnos() {
    return await this.invoke.httpInvoke('getTotalAlumnos');
  }

}
