import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NewHikeSpot } from '../addnewhike/NewHikeSpot';
import { CaloriesService } from '../calories/calories.service';

//This is used to add the favorites icon to the hiking list.
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  public favoriteList: NewHikeSpot[] = [];
  constructor(private caloriesService: CaloriesService, public user: UserService) { }

  ngOnInit() {
    let user = this.user.getUID();
    this.caloriesService.getHikeSpotList().subscribe(res => {
      this.getFavoriteList(user, res);
    });
  }

  getFavoriteList(user, allHike) {
    this.caloriesService.getMyFavorites(user).subscribe(res => {
      this.favoriteList = [];
      res.forEach(fav => {
        let hike = allHike.filter(hike => hike['key'] == fav.key);
        hike[0]['data']['isFav'] = true;
        this.favoriteList.push(hike[0]);
      });
    });
  }

  removeFavorite(hike) {
    let user = this.user.getUID();
    this.caloriesService.markUnFavorite(user, hike['key']).then(re => {
    });
  }
}
