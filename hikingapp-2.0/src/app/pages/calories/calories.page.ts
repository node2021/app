import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { UserService } from 'src/app/services/user/user.service';
import { AlertController } from '@ionic/angular';
import { CommonService } from 'src/app/services/util/common.services';
import { CaloriesService } from './calories.service';
import { NewHikeSpot } from '../addnewhike/NewHikeSpot';
 
@Component({
  selector: 'app-calories',
  templateUrl: './calories.page.html',
  styleUrls: ['./calories.page.scss'],
})
export class CaloriesPage implements OnInit {

  public caloriesList: NewHikeSpot[];
  constructor(private route: Router, private caloriesService: CaloriesService, public user: UserService) { }

  ngOnInit() {
    let user = this.user.getUID();
    this.caloriesService.getHikeSpotList().subscribe(res => {
      this.caloriesList = res;
      this.getFavoriteList(user);
    });
  }


  async addNewHikingPlace() {
    this.route.navigate(['home/addnewhike'])

  }

  updateHikingPlace(key: string) {
    this.route.navigate(['home/addnewhike/edit', key])
  }

  public markAsFavorite(hikeId, isFav) {
    let user = this.user.getUID();
    if (isFav) {
      this.caloriesService.markUnFavorite(user, hikeId).then(re => {
        let hike = this.caloriesList.filter(hike => hike['key'] == hikeId);
        hike[0]['data']['isFav'] = false;
      });
    } else {
      this.caloriesService.addToFavorite(user, hikeId).then(res => {
      });
    }
  }

  public getFavoriteList(user) {
    this.caloriesService.getMyFavorites(user).subscribe(res => {
      res.forEach(fav => {
        let hike = this.caloriesList.filter(hike => hike['key'] == fav.key);
        hike[0]['data']['isFav'] = true;
      });
    });
  }

  del(hikeId){
    console.log(hikeId);
    let user = this.user.getUID();

    this.caloriesService.delete_hike(user,hikeId).then(res => {

    }); 
  }


}
