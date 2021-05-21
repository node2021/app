import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

//This is the home page and contains all routings defined during navigation of the application
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'feed',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/feed/feed.module').then(m => m.FeedPageModule)
          }
        ]
      },
      {
        path: 'places',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/places/places.module').then(m => m.PlacesPageModule)
          }
        ]
      }, 
      {
        path: 'calories',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/calories/calories.module').then(m => m.CaloriesPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: 'capture',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/capture/capture.module').then(m => m.CapturePageModule)
          }
        ]
      },
      {
        path: 'addnewhike',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/addnewhike/addnewhike.module').then(m => m.AddnewhikePageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      }




      
    ]
  },
  {
    path: '',
    redirectTo: '/home/calories',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRouter { }