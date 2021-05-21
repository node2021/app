import { Component } from '@angular/core';
import { CovidService } from '../../services/util/covid.service';
import { NavController } from '@ionic/angular';

// The component contains functions to invoke the service covidservice to fetch the covid details.
@Component({
  selector: 'app-covid19',
  templateUrl: 'covid19.page.html',
  styleUrls: ['covid19.page.scss']
})
export class Covid19Page {

  info: any = null;

  constructor(private covidService: CovidService,private navCtrl: NavController) { 

    this.covidService.getCountries().subscribe((data)=>{
      this.info = data;
    });

  }  

  
  go_back(){
    this.navCtrl.back();
  }

}