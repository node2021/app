import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CommonService } from 'src/app/services/util/common.services';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})


// profile page to display the profiles fo the user.
// user can update the profile page.
export class ProfilePage implements OnInit {

  current_pass; new_pass; confirm_pass

  constructor(
    public userService: UserService,
    private comService: CommonService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.userService.user.username
    this.userService.user.uid
  }

  async update() {
    if (this.new_pass != this.confirm_pass) {
      this.comService.showAlert("New password doesn't match");
    } else {
      let data = {
        email: this.userService.user.username,
        pass: this.current_pass,
        new_pass: this.new_pass
      }
      await this.comService.showLoader('')
      var cu_user = await this.afAuth.currentUser
      this.afAuth.signInWithEmailAndPassword(data.email, data.pass).then(async () => {
        await cu_user.updatePassword(data.new_pass)
        this.comService.showToast('Updated your password successfully')
      }).catch(err => {
        this.comService.showToast("Faild update, " + err.message);
      });      
    }
  }

}
