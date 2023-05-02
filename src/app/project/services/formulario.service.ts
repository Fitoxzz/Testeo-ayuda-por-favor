import { Injectable } from '@angular/core';
import { InvocaService } from '../../base/services/invoca.service';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private InvocaService: InvocaService){}
    async getDatosAlumno(params?: any): Promise<any> {
        try {
            
            return await this.InvocaService.httpInvoke('getDatosAlumno', params)
        } catch (e) {
            throw new Error(e);
        }
    }
}
