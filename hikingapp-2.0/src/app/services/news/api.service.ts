import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = 'e40d07f00b094602953cc3bf8537477e';

  constructor(private httpClient: HttpClient) { }
  
// service integrated with newsapi to fetch the news based on the API KEY
  getNews(){
    return this.httpClient.get(`http://newsapi.org/v2/top-headlines?country=IE&apiKey=${this.API_KEY}`);
  }
}