import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../services/api.service';
import Chart from 'chart.js/auto';
// import Chart from 'chart.js';

@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {
  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  @ViewChild('chartContainer') chartContainer: ElementRef;
  fechaActual = new Date();
  
  
  title: string;
  ind: any;
  data: any;
  name: string;
  year: number;
  month: number;
  public chart: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {

    window.addEventListener('resize', () => {
      if (this.chartContainer.nativeElement.offsetWidth !== this.chart.canvas.parentNode.offsetWidth) {
        this.chart.resize();
      }
    });

    this.month = 0;
    this.ind = this.activatedRoute.snapshot.paramMap.get('ind');
    this.title = this.activatedRoute.snapshot.paramMap.get('ind');
    this.year = this.fechaActual.getFullYear();

    switch (this.ind) {
      case 'dolar':
        this.name = 'Dolares';
        break;
      case 'euro':
        this.name = 'Euros';
        break;
      case 'ipc':
        this.name = 'IPCs';
        break;
      case 'uf':
        this.name = 'UFs';
        break;
      case 'utm':
        this.name = 'UTMs';
        break;
      default:
        break;
    }

    if(this.ind == 'dolar' || this.ind == 'euro' || this.ind == 'uf') {
      this.api.getMonth(this.ind, this.year, this.month).subscribe((data) => {
        this.processData(data);
      });
    } else {
      this.api.getYear(this.ind, this.year).subscribe((data) => {
        this.processData(data);
      })
    }
  }
  
  processData(data) {
    this.data = data[this.name];
          for (let i = 0; i < this.data.length; i++) {
            if (i === 0) {
              this.data[i]['comparacion'] = '';
            } else {
              const valorAnterior = parseFloat(this.data[i - 1]['Valor'].replace(',', '.'));
              const valorActual = parseFloat(this.data[i]['Valor'].replace(',', '.'));
              this.data[i]['comparacion'] = valorActual > valorAnterior ? 'mayor' : 'menor';
            }
          }
          this.createChart(this.ind, data[this.name]);
          this.data = data[this.name].reverse();
  }

  onDateChange(){
    if(this.month == 0) {
      this.chart.destroy();
      this.api.getYear(this.ind, this.year).subscribe((data) => {
          this.processData(data);
        })
      } else {
        this.chart.destroy();
        this.api.getMonth(this.ind, this.year, this.month).subscribe((data) => {
            this.processData(data);
          })
        }
      
  }

  createChart(name, data){
  
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
    data: {
        labels: data.map(d => d.Fecha),
        datasets: [{
            label: name.toUpperCase(),
            data: data.map(d => parseFloat(d.Valor.replace(',', '.'))),
            backgroundColor: '#00439f',
            borderColor: '#575af9',
            borderWidth: 3,
        }]
    },
    options: {
      maintainAspectRatio: false,
      // color: '#ffffff',
        scales: {
            y: {
                // beginAtZero: true
            }
        }
    }
      
    });
  }
}
