import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';



@Component({
  selector: 'app-prueba-stats',
  templateUrl: './prueba-stats.component.html',
  styleUrls: ['./prueba-stats.component.css']
})


export class PruebaStatsComponent {//implements OnInit {
  
  @Input() info: any[];

  constructor(){
  }
}