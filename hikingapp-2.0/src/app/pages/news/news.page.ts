import { Component } from '@angular/core';
import { ApiService } from '../../services/news/api.service';

@Component({
  selector: 'news-home',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss'],
})
export class NewsPage {
  //Displays the news information while invoking 
  //a service hase been integrated with newsapi to fetch the results
  articles;

  constructor(private apiService: ApiService){}

  ionViewDidEnter(){

    this.apiService.getNews().subscribe((data)=>{
      console.log(data);
      this.articles = data['articles'];
    });
  }
}