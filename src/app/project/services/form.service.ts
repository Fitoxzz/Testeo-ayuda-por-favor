import { Injectable } from '@angular/core';
import { InvocaService } from '../../base/services/invoca.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private invoke: InvocaService,) { }
  async datosFormulario(params?: any) {

    try {
      console.log("salió de aqui");
      console.log(params)
      return await this.invoke.httpInvoke('datosFormulario', params)
      
    } catch (e) {
      console.log("aqui no pasa ");
      
      throw new Error(e);
      
    }
  }
}
