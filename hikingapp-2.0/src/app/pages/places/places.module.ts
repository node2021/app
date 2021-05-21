import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { PlacesPageRoutingModule } from './places-routing.module';

import { PlacesPage } from './places.page';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GooglePlaceModule,
    PlacesPageRoutingModule
  ],
  providers: [ 

  ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}
