import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util/util.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.page.html',
  styleUrls: ['./userslist.page.scss'],
})
export class UserslistPage implements OnInit {
  users: User[];
  uid: string;

  constructor(private userService: UserService, private router: Router, private util: UtilService,private navCtrl: NavController) {
    this.util.doLoading('Please Wait...');
    this.userService.getAllUsers().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
      )).subscribe(users => { this.users = users; console.log(users) })
    
  }

  go_back(){
    this.navCtrl.back();
  }

  ngOnInit() {

  }

}