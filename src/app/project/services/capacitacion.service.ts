import { Injectable } from '@angular/core';

import { InvocaService } from '../../base/services/invoca.service';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {

  constructor( private InvocaService: InvocaService) { } // servicio tiene la capacidad de conectarse a backend


  async getFacultades(){
    return await this.InvocaService.httpInvoke('getFacultades');
  }
}
