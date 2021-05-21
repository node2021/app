import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AddnewhikePageRoutingModule } from './addnewhike-routing.module';

import { AddnewhikePage } from './addnewhike.page';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: AddnewhikePage}]),

    AddnewhikePageRoutingModule
  ], 
  declarations: [AddnewhikePage]
})
export class AddnewhikePageModule {}
