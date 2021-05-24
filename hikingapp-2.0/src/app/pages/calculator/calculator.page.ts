import { Component, OnInit} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController } from '@ionic/angular';
import { CaloriesService } from 'src/app/services/caloresInfo/calories.service';
import { UserService } from "src/app/services/user/user.service";

// calculator functionality to display the calculate calories function
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
}) 
export class CalculatorPage implements OnInit {
  ionicForm: FormGroup;
  age:String;
  weight:String;
  height:String;
  gender:String;
  activity:String;
  constructor(public alertController: AlertController, private userservice:UserService, private caloresService: CaloriesService,   private navCtrl: NavController,public formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.getcaloriesInfo()
    
  } 
  go_back(){
    this.navCtrl.back();
  }
  async getcaloriesInfo(){
    var userId = this.userservice.getUID();
    this.caloresService.compareId(userId).then((data)=>{   ///Compares calorie information to see if it is stored in the firebase db.
      if(userId!="Not"){
        console.log(data);
        this.age = data.age;
        this.weight = data.weight;
        this.height = data.height;
        this.gender = data.gender;
        this.activity = data.activity;
      }
    })
  }
  async presentAlertConfirm(form) {
    
    var age = parseInt(form.value['age']);
    var weight= parseInt(form.value['weight']);
    var height= parseInt(form.value['height']);
    var activity =form.value['activity'];
    var gender = form.value['gender'];
    if(gender=="male"){
      var calory = (10*weight+6.25*height-5*age+5)*activity // it is Mifflin-st Jeor Equation (male).
      var calories = calory.toFixed(0);
    }else if(gender=="female"){
      var calory = (10*weight+6.25*height-5*age-161)*activity //it is too (female)
      var calories = calory.toFixed(0);
    }
    // console.log(calories.toFixed(0));
    // Mifflin-St Jeor Equation:
      // For male:
        // BMR = 10W + 6.25H - 5A + 5
      // For female:
        // BMR = 10W + 6.25H - 5A - 161

    if(isNaN(age)==true||isNaN(weight)||isNaN(height)||gender==undefined){
      var header = "Warning";
      var message = "Please fill out all values";
    }else if(activity==undefined){
      var header = "Warning";
      var message = "Please select activity";
    }else{
      var header = "Calories info";
      var message ='Calories :'+calories;
      var addData = {age: age , weight: weight, height: height,gender:gender,activity:activity}; 
      // this.caloresService.setData(addData);
    }
  const alert = await this.alertController.create({ 
      header: header,
      message: '  <strong> '+message+'</strong>!!!',
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
