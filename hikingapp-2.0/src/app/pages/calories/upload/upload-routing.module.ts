import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UploadPage } from './upload.page';
import { ShareModule } from '../../../share.module';


const routes: Routes = [
  {
    path: '',
    component: UploadPage
  }
];
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  	ShareModule],
  exports: [RouterModule],
  declarations: [UploadPage]
})
export class UploadPageRoutingModule {}
