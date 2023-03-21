import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  dolar: any;
  euro: any;
  ipc: any;
  uf: any;
  utm: any;

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
      this.api.getData('dolar').subscribe((data) => {
        this.dolar = data;
      });
      this.api.getData('euro').subscribe((data) => {
        this.euro = data;
      });
      this.api.getData('ipc').subscribe((data) => {
        this.ipc = data;
      });
      this.api.getData('uf').subscribe((data) => {
        this.uf = data;
      });
      this.api.getData('utm').subscribe((data) => {
        this.utm = data;
      });
  }
}
