import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedPageRoutingModule } from './feed-routing.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { FeedPage } from './feed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedPageRoutingModule,
    GooglePlaceModule
  ],
  declarations: [FeedPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FeedPageModule {}
