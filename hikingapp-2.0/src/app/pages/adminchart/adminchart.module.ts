import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminchartPageRoutingModule } from './adminchart-routing.module';

import { AdminchartPage } from './adminchart.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminchartPageRoutingModule,
    HttpClientModule
  ],
  declarations: [AdminchartPage]
})
export class AdminchartPageModule {}
