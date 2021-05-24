import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController } from '@ionic/angular';

// calculator functionality to display the calculate calories function
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {
  ionicForm: FormGroup;

  constructor(public alertController: AlertController,   private navCtrl: NavController,public formBuilder: FormBuilder) {}
  ngOnInit(): void {


    this.ionicForm = this.formBuilder.group({
      weight: ['', [Validators.required, Validators.minLength(2)]] ,
      bweight: ['', [Validators.required, Validators.minLength(2)]] ,
      wu: ['', [Validators.required, Validators.minLength(2)]] 
    })
    
  } 
  go_back(){
    this.navCtrl.back();
  }

 
 // This is to simulate caloires burned calculation . The algorithm may not be accurate

  async presentAlertConfirm(form) {
   
    console.dir('wieght usnits ='+ form.value['wu']);
    console.dir('wieght usnits ='+ form.value['cross']);
    
     var weight= parseInt(form.value['weight']);
     var bweight= parseInt(form.value['bweight']);
//Multiply your body weight in kilograms (i.e. 60) by 0.035. Eg. 0.035 x 60 = 2.1
var result = (weight+bweight)*0.035
//Square your velocity (or speed) in metres per second, i.e. multiply it by itself. Eg. 1.4 x 1.4 = 1.96

var hmins= parseInt(form.value['hmins']);
var dist= parseInt(form.value['dist']);
 var speed=(dist*1000)/(hmins*60);

 var speed2 = speed*speed;

//Divide the result by your height in metres (i.e. 1.6). Eg.1.96 ÷ 1.6 = 1.225


     var calories = result*speed2*1000;
     
    const alert = await this.alertController.create({ 
      header: 'Calories Info!',
      message: '  <strong> Calories : '+calories+'</strong>!!!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
