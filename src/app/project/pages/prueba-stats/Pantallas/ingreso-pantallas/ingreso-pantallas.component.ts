import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ErroresHandler } from '../../../../../base/tools/handler/error/error.handler';
import { IngresoPantallasService } from '../../../../services/ingreso-pantallas.service';
import { SystemService } from 'src/app/base/services/system.service';
import { parse } from 'path';
interface grafico {
  nombre: string,
  value: string
}

@Component({
  selector: 'app-ingreso-pantallas',
  templateUrl: './ingreso-pantallas.component.html',
  styleUrls: ['./ingreso-pantallas.component.css'],
  providers: [DatePipe], //,
  encapsulation: ViewEncapsulation.None
})


export class IngresoPantallasComponent implements OnInit {

  /* variables APPTUI */
  basicOptions: any;
  graficos: grafico[];
  tipoGrafico: string;
  fecha_inicial: Date;
  fecha_final: Date;
  fecha_inicialCarrera: Date;
  fecha_finalCarrera: Date;
  fecha_inicialEstudiantes: Date;
  fecha_finalEstudiantes: Date;
  maxDate: Date;
  mostrarResult: boolean = false;
  totalInteracciones: number;
  dispositivos: number;
  sistema_operativo: string;
  total: number;

  param: any = {
    fecha: "",
    fecha1: "",
  }

  /* Variables Academia */

  fecha_inicialAcademia: Date;
  fecha_finalAcademia: Date;
  fecha_inicialAcademiaInteracciones: Date;
  fecha_finalAcademiaInteracciones: Date;
  totalInteraccionesAppAcademia: number;
  sistema_operativoAppAcademia: string;
  dispositivosAppAcademia: number;

  paramAppTuiCarrera: any = {
    fecha: "",
    fecha1: "",
  }
  paramAppTuiEstudiantes: any = {
    fecha: "",
    fecha1: "",
  }
  paramAcademia: any = {
    fecha: "",
    fecha1: "",
  }
  paramAcademiaPantallas: any = {
    fecha: "",
    fecha1: "",
  }


  constructor(
    private DatePipe: DatePipe,
    private ErroresHandler: ErroresHandler,
    private IngresoPantallasService: IngresoPantallasService,
    private SystemService: SystemService,

  ) {

    this.maxDate = new Date();
    this.maxDate.setHours(0, 0, 0, 0);

    this.carreraSelecc0 = { nombre: "", totalInt: 0, grado: "" }
    this.carreraSelecc1 = { nombre: "", totalInt: 0, grado: "" }
    this.carreraSelecc2 = { nombre: "", totalInt: 0, grado: "" }


    this.mostrarResult = false;
  }


  ngOnInit() {
    this.top5Pantallas();
    this.getAccesoTotalPantallas();
    this.getCantidadTotalInteracciones();
    this.getTopAlumnoCarreras();
    this.getTopCarreras();
    this.getTotalAlumnoXCarrera();
    this.getSistemaOperativo();
    this.getTotalAlumnosAPPTUI();
    this.getTopCarrerasMasInteraccionRango();


    /* APP ACADEMIA */
    this.infoTop5AppAcademia();
    this.getInteraccionesAppAcademia();
    this.getTop5UsuariosAppAcademia();
    this.getSistemaOperativoAppAcademia();


  }


  /* ----------------------- APPTUI  ----------------------- */

  /* PANTALLAS */
  onSelectDate() {
    //console.log('Fecha Inicial:', this.selectedDate);
    this.param.fecha = this.DatePipe.transform(this.fecha_inicial, 'dd/MM/yyyy HH:mm:ss');
    const fecha = this.DatePipe.transform(this.fecha_inicial, 'dd/MM/yyyy HH:mm:ss');
    this.guardarFecha(fecha);
  }


  guardarFecha(fecha: string) {
    console.log(fecha);
  }


  onSelectDate1() {
    //console.log('Fecha Final:', this.selectedDate1);
    this.fecha_final.setHours(23, 59, 59, 0);
    this.param.fecha1 = this.DatePipe.transform(this.fecha_final, 'dd/MM/yyyy HH:mm:ss');
    const fecha1 = this.DatePipe.transform(this.fecha_final, 'dd/MM/yyyy HH:mm:ss');
    this.guardarFecha(fecha1);
  }


  guardarFecha1(fecha1: string) {
    console.log(fecha1);
  }

  async llamarControladorPantallas() {
    this.SystemService.setLoading(true);
    this.getAccesoTotalPantallasDia()
    await this.top5PantallasDia()
    this.SystemService.setLoading(false);


    /*this.SystemService.setLoading(true);

    this.info = await this.IngresoPantallasService.getAccesoTotalPantallasDia(this.param)
    const vistas = this.info.map(item => item.nombre);
    const ingresos = this.info.map(item => item.ingresos);
    this.data = {
      labels: vistas,
      datasets: [
        {
          label: 'Estadisticas',
          data: ingresos
        }
      ]
    };


    this.info3 = await this.IngresoPantallasService.top5PantallasDia(this.param)
    const vistas3 = this.info3.map(item => item.nombre);
    const ingresos3 = this.info3.map(item => item.ingresos);
    this.data3 = {
      labels: vistas3,
      datasets: [
        {
          label: 'Estadisticas',
          data: ingresos3
        }
      ]
    };

    this.SystemService.setLoading(false);

    this.mostrarResult = true;

  }
  */
  }


  data0: any
  info1: any

  async getAccesoTotalPantallasDia() {  // ASIGNAMOS NOMBRE A LA FUNCION 
    try {
      this.SystemService.setLoading(true);

      this.info1 = await this.IngresoPantallasService.getAccesoTotalPantallasDia(this.param)
      const vistas = this.info1.map(item => item.nombre);
      const ingresos = this.info1.map(item => item.ingresos);
      this.data0 = {
        labels: vistas,
        datasets: [
          {
            label: 'Pantalla',
            backgroundColor: 'rgb(6,113,126)',
            data: ingresos
          }
        ]
      }

      this.SystemService.setLoading(false);
      this.mostrarResult = true;

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer la info", "cierre");
    }
  }

  data1: any
  async getAccesoTotalPantallas() {  // ASIGNAMOS NOMBRE A LA FUNCION 
    try {
      this.SystemService.setLoading(true);
      this.info1 = await this.IngresoPantallasService.getAccesoTotalPantallas(this.param)
      console.log(this.param)

      /*const vistas = this.info1.map(item => item.nombre);
      const ingresos = this.info1.map(item => item.ingresos);
      this.data1 = {
        labels: vistas,
        datasets: [
          {
            label: 'Pantalla',
            data: ingresos
          }
        ]
      }
      this.SystemService.setLoading(false);
      this.mostrarResult = true;
      */
    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer la info1", "cierre");
    }
  }


  data2: any
  info2: any
  async top5Pantallas() {  // ASIGNAMOS NOMBRE A LA FUNCION 
    try {

      this.SystemService.setLoading(true);
      this.info2 = await this.IngresoPantallasService.getAccesoTotalPantallas(this.param)
      this.data2 = {
        labels: [this.info2[0].nombre, this.info2[1].nombre, this.info2[2].nombre, this.info2[3].nombre, this.info2[4].nombre],
        datasets: [
          {
            label: 'Pantalla',
            backgroundColor: 'rgb(6,113,126)',
            data: [this.info2[0].ingresos, this.info2[1].ingresos, this.info2[2].ingresos, this.info2[3].ingresos, this.info2[4].ingresos]
          }
        ]
      }
      this.SystemService.setLoading(false);
      this.mostrarResult = true;

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer la info2", "cierre");
    }
  }

  async top5PantallasDia() {  // ASIGNAMOS NOMBRE A LA FUNCION 
    try {
      this.SystemService.setLoading(true);
      this.info1 = await this.IngresoPantallasService.getAccesoTotalPantallasDia(this.param)
      this.data2 = {
        labels: [this.info1[0].nombre, this.info1[1].nombre, this.info1[2].nombre, this.info1[3].nombre, this.info1[4].nombre],
        options: {
          responsive: true
        },
        datasets: [
          {
            label: 'Estadisticas',
            backgroundColor: 'rgb(6,113,126)',
            data: [this.info1[0].ingresos, this.info1[1].ingresos, this.info1[2].ingresos, this.info1[3].ingresos, this.info1[4].ingresos]
          }
        ]
      }

      this.SystemService.setLoading(false);

      this.mostrarResult = true;
    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer del acceso total a pantallas por dia");
    }
  }

  /* CARRERAS */

  async llamarControladorCarreras() {
    this.SystemService.setLoading(true);
    this.getTopCarrerasMasInteraccionRango();
    //this.getInteraccionesRango();
    //this.getTotalAlumnosAPPTUIRango();
    //this.getTopAlumnoCarrerasRango();
    this.SystemService.setLoading(false);
  }
  onSelectDateCarrera() {
    //console.log('Fecha Inicial:', this.selectedDate);
    this.paramAppTuiCarrera.fecha = this.DatePipe.transform(this.fecha_inicialCarrera, 'dd/MM/yyyy HH:mm:ss');
    const fecha = this.DatePipe.transform(this.fecha_inicialCarrera, 'dd/MM/yyyy HH:mm:ss');
    this.guardarFecha(fecha);
  }


  guardarFechaCarrera(fecha: string) {
    console.log(fecha);
  }
  onSelectDate1Carrera() {
    //console.log('Fecha Final:', this.selectedDate1);
    this.fecha_finalCarrera.setHours(23, 59, 59, 0);
    this.paramAppTuiCarrera.fecha1 = this.DatePipe.transform(this.fecha_finalCarrera, 'dd/MM/yyyy HH:mm:ss');
    const fecha1 = this.DatePipe.transform(this.fecha_finalCarrera, 'dd/MM/yyyy HH:mm:ss');
    this.guardarFecha(fecha1);
  }
  guardarFecha1Carrera(fecha1: string) {
    console.log(fecha1);
  }

  carreras: any
  carreraSelecc0: any
  carreraSelecc1: any
  carreraSelecc2: any

  async getTopCarreras() {
    this.SystemService.setLoading(true);
    try {
      this.carreras = await this.IngresoPantallasService.getTopCarreras();
      this.carreraSelecc0 = this.carreras[0];
      this.carreraSelecc1 = this.carreras[1];
      this.carreraSelecc2 = this.carreras[2];
      console.log(this.carreras)

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer las carreras con más interaccion", "cierre");
    }
    this.SystemService.setLoading(false);
    this.mostrarResult = true;
  }


  async getTopCarrerasMasInteraccionRango() {
    this.SystemService.setLoading(true);
    try {
      this.carreras = await this.IngresoPantallasService.getTopCarrerasMasInteraccionRango(this.paramAppTuiCarrera);
      this.carreraSelecc0 = this.carreras[0];
      this.carreraSelecc1 = this.carreras[1];
      this.carreraSelecc2 = this.carreras[2];
      console.log("llego ", this.carreras)
    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer las carreras con más interaccion por rango", "cierre");
    }
    this.SystemService.setLoading(false);
    this.mostrarResult = true;
  }

  alumnoSelec2: any
  data10: any
  async getTotalAlumnoXCarrera() {
    this.SystemService.setLoading(true);
    this.data10 = await this.IngresoPantallasService.getTotalAlumnoXCarrera();
    this.alumnoSelec2 = this.data10[0]
    this.SystemService.setLoading(false);

    //this.mostrarResult = true;
  }




  /* ESTUDIANTES */


  async llamarControladorEstudiantes() {
    this.SystemService.setLoading(true);
    this.getTopAlumnoCarrerasRango();
    this.getInteraccionesRango();
    this.getTotalAlumnosAPPTUIRango();
    this.SystemService.setLoading(false);

  }

  onSelectDateEstudiantes() {
    //console.log('Fecha Inicial:', this.selectedDate);
    this.paramAppTuiEstudiantes.fecha = this.DatePipe.transform(this.fecha_inicialEstudiantes, 'dd/MM/yyyy HH:mm:ss');
    const fecha = this.DatePipe.transform(this.fecha_inicialEstudiantes, 'dd/MM/yyyy HH:mm:ss');
    this.guardarFecha(fecha);
  }


  guardarFechaEstudiantes(fecha: string) {
    console.log(fecha);
  }
  onSelectDate1Estudiantes() {
    //console.log('Fecha Final:', this.selectedDate1);
    this.fecha_finalEstudiantes.setHours(23, 59, 59, 0);
    this.paramAppTuiEstudiantes.fecha1 = this.DatePipe.transform(this.fecha_finalEstudiantes, 'dd/MM/yyyy HH:mm:ss');
    const fecha1 = this.DatePipe.transform(this.fecha_finalEstudiantes, 'dd/MM/yyyy HH:mm:ss');
    this.guardarFecha(fecha1);
  }
  guardarFecha1Estudiantes(fecha1: string) {
    console.log(fecha1);
  }


  alumnos: any
  alumnoSelec1: any
  async getTopAlumnoCarreras() {
    this.SystemService.setLoading(true);
    try {
      this.alumnos = await this.IngresoPantallasService.getTopAlumnoCarreras();
      this.alumnoSelec1 = this.alumnos[0];
      console.log("estos son los alumnos", this.alumnos);

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer los alumnos con más interaccion", "cierre");
    }
    this.SystemService.setLoading(false);

    this.mostrarResult = true;
  }
  async getTopAlumnoCarrerasRango() {
    this.SystemService.setLoading(true);
    try {
      this.alumnos = await this.IngresoPantallasService.getTopAlumnoCarrerasRango(this.paramAppTuiEstudiantes);
      this.alumnoSelec1 = this.alumnos[0];
      console.log("estos son los alumnos", this.alumnos);

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer los alumnos con más interaccion por rango", "cierre");
    }
    this.SystemService.setLoading(false);

    this.mostrarResult = true;
  }

  async getCantidadTotalInteracciones() {
    this.SystemService.setLoading(true);
    let data: any = await this.IngresoPantallasService.getCantidadTotalInteracciones();
    this.totalInteracciones = parseInt(data.Cantidad)
    console.log("estas son las interacciones", this.totalInteracciones)


    /*let data1: any = await this.IngresoPantallasService.getTotalAlumnosAPPTUI();
    console.log(data1)
    this.total = parseInt(data1.total_alumnos);
    console.log("total alumnos", this.total);
*/this.mostrarResult = true;
    this.SystemService.setLoading(false);
    //this.mostrarResult = true;

  }
  async getInteraccionesRango() {
    this.SystemService.setLoading(true);
    let data: any = await this.IngresoPantallasService.getInteraccionesRango(this.paramAppTuiEstudiantes);
    this.totalInteracciones = parseInt(data.Cantidad)
    console.log("estas son las interacciones", this.totalInteracciones)


    /*let data1: any = await this.IngresoPantallasService.getTotalAlumnosAPPTUI();
    console.log(data1)
    this.total = parseInt(data1.total_alumnos);
    console.log("total alumnos", this.total);
*/this.mostrarResult = true;
    this.SystemService.setLoading(false);
    //this.mostrarResult = true;

  }

  async getTotalAlumnosAPPTUI() {
    this.SystemService.setLoading(true);
    let data: any = await this.IngresoPantallasService.getTotalAlumnosAPPTUI();
    console.log(data)
    this.total = parseInt(data.total_alumnos);
    console.log("total alumnos", this.total);
    this.SystemService.setLoading(false);

  }
  async getTotalAlumnosAPPTUIRango() {
    this.SystemService.setLoading(true);
    let data: any = await this.IngresoPantallasService.getTotalAlumnosAPPTUIRango(this.paramAppTuiEstudiantes);
    console.log("info", data)
    this.total = parseInt(data.usuarios);
    console.log("total alumnos rango", this.total);
    this.mostrarResult = true;
    this.SystemService.setLoading(false);

  }
  async getSistemaOperativo() {
    this.SystemService.setLoading(true);
    let data: any = await this.IngresoPantallasService.getSistemaOperativo();
    console.log(data)
    this.sistema_operativo = (data.SISTEMA_OPERATIVO)
    this.dispositivos = parseInt(data.cant)
    console.log("", this.totalInteracciones, this.sistema_operativo)

    this.SystemService.setLoading(false);
  }


  /* ----------------------- APPTUI ACADEMIA ----------------------- */


  /* PANTALLAS */


  onSelectDateIniAcademia() {
    //console.log('Fecha Inicial:', this.selectedDate);
    this.paramAcademiaPantallas.fecha = this.DatePipe.transform(this.fecha_inicialAcademia, 'dd/MM/yyyy HH:mm:ss');
    const fecha = this.DatePipe.transform(this.fecha_inicialAcademia, 'dd/MM/yyyy HH:mm:ss');
    this.guardarFecha(fecha);
  }

  guardarFechaIniAcademia(fecha: string) {
    console.log(fecha);
  }

  onSelectDateFinalAcademia() {
    //console.log('Fecha Final:', this.selectedDate1);
    this.fecha_finalAcademia.setHours(23, 59, 59, 0);
    this.paramAcademiaPantallas.fecha1 = this.DatePipe.transform(this.fecha_finalAcademia, 'dd/MM/yyyy HH:mm:ss');
    const fecha1 = this.DatePipe.transform(this.fecha_finalAcademia, 'dd/MM/yyyy HH:mm:ss');
    this.guardarFecha(fecha1);
  }

  guardarFechaFinAcademia(fecha1: string) {
    console.log(fecha1);
  }

  async llamarControladorPantallasAppAcademia() {
    this.SystemService.setLoading(true);
    this.getAccesoTotalPantallasDiaAppAcademia();
    this.infoTop5AppAcademiaDia();
    this.SystemService.setLoading(false);
  }


  infoPantallasAppAcademia: any
  async getAccesoTotalPantallasDiaAppAcademia() {  // ASIGNAMOS NOMBRE A LA FUNCION 
    try {
      this.SystemService.setLoading(true);

      this.infoPantallasAppAcademia = await this.IngresoPantallasService.getAccesoTotalPantallasDiaAppAcademia(this.paramAcademiaPantallas)
      this.SystemService.setLoading(false);
      this.mostrarResult = true;
    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer Pantallas por rango App Academia", "cierre");
    }
  }


  async getAccesoTotalPantallasAppAcademia() {
    try {
      this.SystemService.setLoading(true);
      this.infoPantallasAppAcademia = await this.IngresoPantallasService.getAccesoTotalPantallasAppAcademia(this.paramAcademiaPantallas)
      this.SystemService.setLoading(false);
      this.mostrarResult = true;

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer Pantallas App Academia", "cierre");
    }
  }

  dataGraficosAppAcademia: any
  async infoTop5AppAcademia() {  // ASIGNAMOS NOMBRE A LA FUNCION 
    try {

      this.SystemService.setLoading(true);
      this.infoPantallasAppAcademia = await this.IngresoPantallasService.getAccesoTotalPantallasAppAcademia(this.paramAcademiaPantallas)
      this.dataGraficosAppAcademia = {
        labels: [this.infoPantallasAppAcademia[0].nombre, this.infoPantallasAppAcademia[1].nombre, this.infoPantallasAppAcademia[2].nombre, this.infoPantallasAppAcademia[3].nombre, this.infoPantallasAppAcademia[4].nombre],
        datasets: [
          {
            label: 'Pantalla',
            backgroundColor: 'rgb(6,113,126)',
            data: [this.infoPantallasAppAcademia[0].ingresos, this.infoPantallasAppAcademia[1].ingresos, this.infoPantallasAppAcademia[2].ingresos, this.infoPantallasAppAcademia[3].ingresos, this.infoPantallasAppAcademia[4].ingresos]
          }
        ]
      }
      this.SystemService.setLoading(false);
      this.mostrarResult = true;

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer info top 5 general", "cierre");
    }
  }

  async infoTop5AppAcademiaDia() {  // ASIGNAMOS NOMBRE A LA FUNCION 
    try {
      this.SystemService.setLoading(true);
      this.infoPantallasAppAcademia = await this.IngresoPantallasService.getAccesoTotalPantallasDiaAppAcademia(this.paramAcademiaPantallas)
      this.dataGraficosAppAcademia = {
        labels: [this.infoPantallasAppAcademia[0].nombre, this.infoPantallasAppAcademia[1].nombre, this.infoPantallasAppAcademia[2].nombre, this.infoPantallasAppAcademia[3].nombre, this.infoPantallasAppAcademia[4].nombre],
        datasets: [
          {
            label: 'Estadisticas',
            backgroundColor: 'rgb(6,113,126)',
            data: [this.infoPantallasAppAcademia[0].ingresos, this.infoPantallasAppAcademia[1].ingresos, this.infoPantallasAppAcademia[2].ingresos, this.infoPantallasAppAcademia[3].ingresos, this.infoPantallasAppAcademia[4].ingresos]
          }
        ]
      }

      this.SystemService.setLoading(false);

      this.mostrarResult = true;
    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer info top 5 dia");
    }
  }


  /* INTERACCIONES */

  async llamarControladorInteraccionAppAcademia(){
    this.SystemService.setLoading(true);
    this.getInteraccionesPorDiaAppAcademia();
    this.getTop5UsuariosAppAcademiaRango();
    this.SystemService.setLoading(false);
  }

  onSelectDateIniAcademiaInteracciones() {
    //console.log('Fecha Inicial:', this.selectedDate);
    this.paramAcademia.fecha = this.DatePipe.transform(this.fecha_inicialAcademiaInteracciones, 'dd/MM/yyyy HH:mm:ss');
    const fecha = this.DatePipe.transform(this.fecha_inicialAcademiaInteracciones, 'dd/MM/yyyy HH:mm:ss');
    this.guardarFecha(fecha);
  }

  guardarFechaIniAcademiaInteracciones(fecha: string) {
    console.log(fecha);
  }

  onSelectDateFinalAcademiaInteracciones() {
    //console.log('Fecha Final:', this.selectedDate1);
    this.fecha_finalAcademiaInteracciones.setHours(23, 59, 59, 0);
    this.paramAcademia.fecha1 = this.DatePipe.transform(this.fecha_finalAcademiaInteracciones, 'dd/MM/yyyy HH:mm:ss');
    const fecha1 = this.DatePipe.transform(this.fecha_finalAcademiaInteracciones, 'dd/MM/yyyy HH:mm:ss');
    this.guardarFecha(fecha1);
  }

  guardarFechaFinAcademiaInteracciones(fecha1: string) {
    console.log(fecha1);
  }

  async getInteraccionesAppAcademia() {
    this.SystemService.setLoading(true);
    let data: any = await this.IngresoPantallasService.getInteraccionesAppAcademia();
    console.log("info",data);
    this.totalInteraccionesAppAcademia = parseInt(data.interacciones)
    console.log("estas son las interacciones", this.totalInteraccionesAppAcademia)


    /*let data1: any = await this.IngresoPantallasService.getTotalAlumnosAPPTUI();
    console.log(data1)
    this.total = parseInt(data1.total_alumnos);
    console.log("total alumnos", this.total);
*/
    this.mostrarResult = true;
    this.SystemService.setLoading(false);
    //this.mostrarResult = true;

  }

  async getInteraccionesPorDiaAppAcademia() {
    this.SystemService.setLoading(true);
    let data: any = await this.IngresoPantallasService.getInteraccionesPorDiaAppAcademia(this.paramAcademia);
    console.log("info",data);
    this.totalInteraccionesAppAcademia = parseInt(data.interacciones)
    console.log("estas son las interacciones", this.totalInteraccionesAppAcademia)


    /*let data1: any = await this.IngresoPantallasService.getTotalAlumnosAPPTUI();
    console.log(data1)
    this.total = parseInt(data1.total_alumnos);
    console.log("total alumnos", this.total);
*/this.mostrarResult = true;
    this.SystemService.setLoading(false);
    //this.mostrarResult = true;

  }

  academicos: any
  async getTop5UsuariosAppAcademia() {
    this.SystemService.setLoading(true);
    try {
      this.academicos = await this.IngresoPantallasService.getTop5UsuariosAppAcademia();
      console.log("estos son los academicos", this.academicos);

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer a los academicos con más interaccion", "cierre");
    }
    this.SystemService.setLoading(false);

    this.mostrarResult = true;
  }

  async getTop5UsuariosAppAcademiaRango() {
    this.SystemService.setLoading(true);
    try {
      this.academicos = await this.IngresoPantallasService.getTop5UsuariosAppAcademiaRango(this.paramAcademia);
      console.log("estos son los academicos", this.academicos);

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer a los academicos con más interaccion por dia", "cierre");
    }
    this.SystemService.setLoading(false);

    this.mostrarResult = true;
  }

  async getSistemaOperativoAppAcademia() {
    this.SystemService.setLoading(true);
    let data: any = await this.IngresoPantallasService.getSistemaOperativoAppAcademia();
    console.log(data)
    this.sistema_operativoAppAcademia = (data.SISTEMA_OPERATIVO)
    this.dispositivosAppAcademia = parseInt(data.dispositivos)
    console.log("aaaa", this.dispositivosAppAcademia, this.sistema_operativoAppAcademia)

    this.SystemService.setLoading(false);
  }



  // async getAccesoTotalPantallasDia() {  // ASIGNAMOS NOMBRE A LA FUNCION 
  //   try {
  //     this.SystemService.setLoading(true);

  //     this.info1 = await this.IngresoPantallasService.getAccesoTotalPantallasDia(this.param)
  //     const vistas = this.info1.map(item => item.nombre);
  //     const ingresos = this.info1.map(item => item.ingresos);
  //     this.data0 = {
  //       labels: vistas,
  //       datasets: [
  //         {
  //           label: 'Pantalla',
  //           backgroundColor: 'rgb(6,113,126)',
  //           data: ingresos
  //         }
  //       ]
  //     }

  //     this.SystemService.setLoading(false);
  //     this.mostrarResult = true;

  //   } catch (e) {
  //     this.ErroresHandler.processError(e, "alert", "Hubo un error al traer la info", "cierre");
  //   }
  // }
}



