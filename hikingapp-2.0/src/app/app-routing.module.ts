import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
  // },
  // ALL THE ROUTING configurations are configured in the applicaiton
  //based on the path the corresonding comonent is invoked
  
  // {
  //   path: '', 
  //  // loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  //    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  // },   
  
//  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  }, 
  {
    path: 'places',
    loadChildren: () => import('./pages/places/places.module').then( m => m.PlacesPageModule)
  }, 
  {
    path: 'calories',
    loadChildren: () => import('./pages/calories/calories.module').then( m => m.CaloriesPageModule)
  }, 
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'upload',
    loadChildren: () => import('./pages/upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'covid19',
    loadChildren: () => import('./pages/covid19/covid19.module').then( m => m.Covid19PageModule)
  }, 
  {
    path: 'calculator',
    loadChildren: () => import('./pages/calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
    {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'capture',
    loadChildren: () => import('./pages/capture/capture.module').then( m => m.CapturePageModule)
  },
  {
    path: 'addnewhike',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/addnewhike/addnewhike.module').then(m => m.AddnewhikePageModule)
      }
    ]
  },
  {
    path: 'addnewhike',
    loadChildren: () => import('./pages/addnewhike/addnewhike.module').then( m => m.AddnewhikePageModule)
  },
  {
    path: 'userslist',
    loadChildren: () => import('./pages/userslist/userslist.module').then( m => m.UserslistPageModule)
  },
  {
    path: 'adminchart',
    loadChildren: () => import('./pages/adminchart/adminchart.module').then( m => m.AdminchartPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
