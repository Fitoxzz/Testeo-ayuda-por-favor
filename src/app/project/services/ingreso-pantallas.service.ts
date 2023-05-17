import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InvocaService } from '../../base/services/invoca.service';


@Injectable({
  providedIn: 'root'
})
export class IngresoPantallasService{
  constructor(private invoke: InvocaService,) { }


 /* --------------------- APPTUI  --------------------- */


 /* dbo.CONSULTAS_PROYECTO_ESTADISTICAS_POR_RANGOS  */
 async getTopAlumnoCarrerasRango(paramAppTuiEstudiantes?: any) {
  try {
    console.log("salió de aqui");
    console.log(paramAppTuiEstudiantes)
    return await this.invoke.httpInvoke('getTopAlumnoCarrerasRango', paramAppTuiEstudiantes);

  } catch (e) {
    throw new Error(e);


  }
}
async getTopCarrerasMasInteraccionRango(paramAppTuiCarrera?: any) {
  try {
    console.log("salió de aqui");
    console.log(paramAppTuiCarrera);
    return await this.invoke.httpInvoke('getTopCarrerasMasInteraccionRango', paramAppTuiCarrera);

  } catch (e) {
    throw new Error(e);


  }
}
async getInteraccionesRango(paramAppTuiEstudiantes?: any) {
  try {
    console.log("salió de aqui");
    console.log(paramAppTuiEstudiantes)
    return await this.invoke.httpInvoke('getInteraccionesRango', paramAppTuiEstudiantes);

  } catch (e) {
    throw new Error(e);


  }
}
async getTotalAlumnosAPPTUIRango(paramAppTuiEstudiantes?: any) {
  try {
    console.log("salió de aqui1");
    console.log(paramAppTuiEstudiantes)
    return await this.invoke.httpInvoke('getTotalAlumnosAPPTUIRango', paramAppTuiEstudiantes);

  } catch (e) {
    throw new Error(e);


  }
}
 /* */

  async getAccesoTotalPantallas(param?: any) {
    try {
      console.log("salió de aqui");
      console.log(param)
      return await this.invoke.httpInvoke('getAccesoTotalPantallas', param);

    } catch (e) {
      throw new Error(e);


    }
  }

  async getAccesoTotalPantallasDia(param?: any) {

    try {
      console.log(param)
      return await this.invoke.httpInvoke('getAccesoTotalPantallasDia', param);

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
  async getSistemaOperativo() {
    try {
      return await this.invoke.httpInvoke('getSistemaOperativo');
    } catch (e) {
      throw new Error(e);
    }
  }

  /* --------------------- APPTUI ACADEMIA --------------------- */

  /* DB: APPTUI_ACADEMICOS*/

  /*db0.GET_INTERACCIONES_PANTALLAS */

  async getAccesoTotalPantallasDiaAppAcademia(paramAcademiaPantallas?: any) {
    try {
      console.log("salió de aqui");
      console.log(paramAcademiaPantallas)
      return await this.invoke.httpInvoke('getAccesoTotalPantallasDiaAppAcademia', paramAcademiaPantallas);

    } catch (e) {
      throw new Error(e);


    }
  }

  async getAccesoTotalPantallasAppAcademia(paramAcademiaPantallas?: any) {

    try {
      console.log(paramAcademiaPantallas)
      return await this.invoke.httpInvoke('getAccesoTotalPantallasAppAcademia', paramAcademiaPantallas);

    } catch (e) {
      throw new Error(e);

    }
  }

  async getInteraccionesPorDiaAppAcademia(paramAcademia?: any) {

    try {
      console.log(paramAcademia)
      return await this.invoke.httpInvoke('getInteraccionesPorDiaAppAcademia', paramAcademia);

    } catch (e) {
      throw new Error(e);

    }
  }

  async getTop5UsuariosAppAcademiaRango(paramAcademia?: any) {

    try {
      console.log("prueba",paramAcademia)
      return await this.invoke.httpInvoke('getTop5UsuariosAppAcademiaRango', paramAcademia);

    } catch (e) {
      throw new Error(e);

    }
  }

   /*db0.GET_DISPOSITIVOS_APP_ACADEMIA */ 
  async getInteraccionesAppAcademia() {

    try {
      return await this.invoke.httpInvoke('getInteraccionesAppAcademia');
    } catch (e) {
      throw new Error(e);

    }
  }

  async getTop5UsuariosAppAcademia() {

    try {
      return await this.invoke.httpInvoke('getTop5UsuariosAppAcademia');

    } catch (e) {
      throw new Error(e);

    }
  }

  async getSistemaOperativoAppAcademia() {

    try {
      return await this.invoke.httpInvoke('getSistemaOperativoAppAcademia');

    } catch (e) {
      throw new Error(e);

    }
  }

}