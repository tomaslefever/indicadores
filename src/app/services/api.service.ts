import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  fecha = new Date();
  constructor(
    private http: HttpClient,
    ) { }
    
    getData(ind: string) {
      return this.http.get(environment.apiBaseUrl+ind+'?apikey='+environment.apiKey+'&formato=json');
    }

    getMonth(ind: string, year: number, month: number) {
      return this.http.get(environment.apiBaseUrl+ind+'/'+year+'/'+month+'?apikey='+environment.apiKey+'&formato=json');
    }

    getYear(ind: string, year: number) {
      return this.http.get(environment.apiBaseUrl+ind+'/'+year+'?apikey='+environment.apiKey+'&formato=json');
    }
}
