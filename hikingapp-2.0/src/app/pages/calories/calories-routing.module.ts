import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaloriesPage } from './calories.page';

const routes: Routes = [
  {
    path: '',
    component: CaloriesPage,
    children: [
   
      {
        path: 'upload',
        loadChildren: () => import('../../pages/calories/upload/upload.module').then( m => m.UploadPageModule)
      },

      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaloriesPageRoutingModule {}
