import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//This is created to show slides on the home page.  
//Slides are used to highlight the application features

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {

    slideOpts = { 
    speed: 400
  };
  

  constructor(private route: Router) { }

  ngOnInit() {}
// navigate to login page when clicked to Register
  navigateToLogin(){ 
    this.route.navigate(['/login']);
  }
// navigate to signup page when clicked to Register
  navigateToRegister(){
    this.route.navigate(['/signup']);
  }

}
