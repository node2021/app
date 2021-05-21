import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminchartPage } from './adminchart.page';

const routes: Routes = [
  {
    path: '',
    component: AdminchartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminchartPageRoutingModule {}
