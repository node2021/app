import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/util/common.services';
import { UserService } from 'src/app/services/user/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

// Setting page to configure applicaiton settings
//This has to be implemented as this is impelmented partially
export class SettingsPage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private comService: CommonService,
    private navCtrl: NavController,
    private storage: Storage,
    

  ) { }

  ngOnInit() {
  }


  // On click of the the logout button user session is closed.
  async logout() {
   // this.comService.showLoader('')
    await this.afAuth.signOut();
    this.userService.user = null;
    this.userService.removeUser();  
  
    //this.comService.hideLoader();
    this.navCtrl.navigateRoot('login');
  }

  goProfile() {
    this.navCtrl.navigateForward('home/profile');
  }

}
