import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InvocaService } from '../../base/services/invoca.service';


@Injectable({
  providedIn: 'root'
})
export class IngresoPantallasService{
  constructor(private invoke: InvocaService,) { }

  async getAccesoTotalPantallas(param?: any) {
    try {
      console.log("salió de aqui");
      console.log(param)
      return await this.invoke.httpInvoke('getAccesoTotalPantallas', param);

    } catch (e) {
      throw new Error(e);


    }
  }


  async llamarControladorPantallas() {
    await this.getAccesoTotalPantallasDia();
    await this.top5Pantallas();
    await this.top5PantallasDia();
    await this.getAccesoTotalPantallasDia();
  }

  async getAccesoTotalPantallasDia(param?: any) {

    try {
      console.log("a",param)
      return await this.invoke.httpInvoke('getAccesoTotalPantallasDia', param);

    } catch (e) {
      throw new Error(e);

    }
  }
  async top5Pantallas(param?: any) {

    try {
      console.log(param);
      return await this.invoke.httpInvoke('top5Pantallas', param);

    } catch (e) {
      throw new Error(e);

    }
  }
  async top5PantallasDia(param?: any) {
    try {
      console.log(param);
      return await this.invoke.httpInvoke('top5PantallasDia', param);
    } catch (e) {
      throw new Error(e);

    }
  }
  async getTopCarreras() {
    try {

      return await this.invoke.httpInvoke('getTopCarreras');
    } catch (e) {
      throw new Error(e);
    }
  }
  async getTopAlumnoCarreras() {
    try {

      return await this.invoke.httpInvoke('getTopAlumnoCarreras');
    } catch (e) {
      throw new Error(e);
    }
  }
  async getCantidadTotalInteracciones() {
    try {

      return await this.invoke.httpInvoke('getCantidadTotalInteracciones');
    } catch (e) {
      throw new Error(e);
    }
  }
  async getTotalAlumnoXCarrera() {
    try {
      return await this.invoke.httpInvoke('getTotalAlumnoXCarrera');
    } catch (e) {
      throw new Error(e);
    }
  }
  async getTotalAlumnosAPPTUI() {
    try {
      return await this.invoke.httpInvoke('getTotalAlumnosAPPTUI');
    } catch (e) {
      throw new Error(e);
    }
  }

}