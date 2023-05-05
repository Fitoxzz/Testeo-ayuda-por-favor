import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ErroresHandler } from '../../../../../base/tools/handler/error/error.handler';
import { IngresoPantallasService } from '../../../../services/ingreso-pantallas.service';
import { SystemService } from 'src/app/base/services/system.service';
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


  estilo1: { 'background': 'blue' };
  basicOptions: any;
  graficos: grafico[];
  tipoGrafico: string;
  fecha_inicial: Date;
  fecha_final: Date;
  maxDate: Date;
  mostrarResult: boolean = false;
  totalInteracciones: number;
  total: number;

  param: any = {
    fecha: "",
    fecha1: "",
  }

  constructor(
    private DatePipe: DatePipe,
    private ErroresHandler: ErroresHandler,
    private IngresoPantallasService: IngresoPantallasService,
    private SystemService: SystemService,

  ) {
    this.tipoGrafico = 'bar';
    this.graficos = [
      { nombre: 'Polar Area', value: 'polarArea' },
      { nombre: 'Bar', value: 'bar' }
    ];
    this.maxDate = new Date();
    this.maxDate.setHours(0, 0, 0, 0);

    this.mostrarResult = false;
  }


  ngOnInit() {
    this.top5Pantallas();
    this.getAccesoTotalPantallas();
    this.getCantidadTotalInteracciones();
    this.getTopAlumnoCarreras();
    this.getTopCarreras();
    this.getTotalAlumnoXCarrera();

  }

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
    await this.getAccesoTotalPantallasDia()
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


  data: any
  info: any


  async getAccesoTotalPantallasDia() {  // ASIGNAMOS NOMBRE A LA FUNCION 
    try {
      this.SystemService.setLoading(true);

      this.info = await this.IngresoPantallasService.getAccesoTotalPantallasDia(this.param)
      console.log("info", this.info);
      const vistas = this.info.map(item => item.vista);
      const ingresos = this.info.map(item => item.ingresos);
      this.data = {
        labels: vistas,
        datasets: [
          {
            label: 'Estadisticas',
            data: ingresos
          }
        ]
      }

      console.log("info", this.info);

      this.SystemService.setLoading(false);
      this.mostrarResult = true;

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer la info", "cierre");
    }
  }

  data1: any
  info1: any

  async getAccesoTotalPantallas() {  // ASIGNAMOS NOMBRE A LA FUNCION 
    try {
      this.SystemService.setLoading(true);
      this.info1 = await this.IngresoPantallasService.getAccesoTotalPantallas(this.param)
      console.log(this.param)
      const vistas = this.info1.map(item => item.nombre);
      const ingresos = this.info1.map(item => item.ingresos);
      this.data1 = {
        labels: vistas,
        datasets: [
          {
            label: 'Estadisticas',
            data: ingresos
          }
        ]
      }
      this.SystemService.setLoading(false);
      this.mostrarResult = true;
    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer la info1", "cierre");
    }
  }

  data2: any
  info2: any
  async top5Pantallas() {  // ASIGNAMOS NOMBRE A LA FUNCION 
    try {

      this.SystemService.setLoading(true);
      this.info2 = await this.IngresoPantallasService.top5Pantallas(this.param)
      const vistas = this.info2.map(item => item.nombre);
      const ingresos = this.info2.map(item => item.ingresos);
      this.data2 = {
        labels: vistas,
        datasets: [
          {
            label: 'Estadisticas',
            data: ingresos
          }
        ]
      }
      this.SystemService.setLoading(false);
      this.mostrarResult = true;

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer la info2", "cierre");
    }
  }

  data3: any
  info3: any

  async top5PantallasDia() {  // ASIGNAMOS NOMBRE A LA FUNCION 
    try {
      console.log(this.info3)
      this.SystemService.setLoading(true);
      this.info3 = await this.IngresoPantallasService.top5PantallasDia(this.param)
      const vistas = this.info3.map(item => item.nombre);
      const ingresos = this.info3.map(item => item.ingresos);
      this.data3 = {
        labels: vistas,
        datasets: [
          {
            label: 'Estadisticas',
            data: ingresos
          }
        ]
      }

      this.SystemService.setLoading(false);

      this.mostrarResult = true;
    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer la info3", "cierre");
    }
  }

  carreras: any
  carreraSelecc: any
  async getTopCarreras() {
    this.SystemService.setLoading(true);
    try {
      this.carreras = await this.IngresoPantallasService.getTopCarreras();
      this.carreraSelecc = this.carreras[0];
      console.log("estas son las carreras", this.carreras)

    } catch (e) {
      this.ErroresHandler.processError(e, "alert", "Hubo un error al traer las carreras con más interaccion", "cierre");

    }
    this.SystemService.setLoading(false);

    this.mostrarResult = true;
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


  async getCantidadTotalInteracciones() {
    this.SystemService.setLoading(true);
    let data: any = await this.IngresoPantallasService.getCantidadTotalInteracciones();
    console.log(data)
    this.totalInteracciones = parseInt(data.Cantidad)
    console.log("estas son las interacciones", this.totalInteracciones)


    let data1: any = await this.IngresoPantallasService.getTotalAlumnosAPPTUI();
    console.log(data1)
    this.total = parseInt(data1.total_alumnos);
    console.log("total alumnos", this.total);

    this.SystemService.setLoading(false);
    this.mostrarResult = true;

  }
  alumnoSelec2: any
  async getTotalAlumnoXCarrera() {
    this.SystemService.setLoading(true);
    this.data = await this.IngresoPantallasService.getTotalAlumnoXCarrera();
    this.alumnoSelec2 = this.data[0]
    this.SystemService.setLoading(false);

    this.mostrarResult = true;
  }

  // public total: any
  // async getTotalAlumnosAPPTUI() {
  //   let data = await this.IngresoPantallasService.getTotalAlumnosAPPTUI();
  //   this.total = data[0].total
  //   console.log("total alumnos", data[0].cantAlumno);

  // }

}



