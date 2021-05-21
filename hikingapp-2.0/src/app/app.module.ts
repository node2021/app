import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { ShareModule } from './share.module';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/File/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ServicesModule } from './services/services.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import '@ungap/global-this';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,//Add if needed 
    FormsModule,
    ShareModule,
    HttpClientModule,
    ServicesModule ,
    GooglePlaceModule
  ],
  providers: [
    HttpClientModule,
    StatusBar,
    SplashScreen,
    UserService,
    AuthService,
    ImagePicker,
    MediaCapture,
    File,
    Media,
    Geolocation,
    StreamingMedia,
    PhotoViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 

  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
