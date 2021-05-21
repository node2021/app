import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  apiUrl = 'https://coronavirus-19-api.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.apiUrl}all`, );
  }


  // service to fetch the covid cases based on the country ireland 
  getCountries() {
    return this.http.get(`${this.apiUrl}countries/ireland`);
  }
}