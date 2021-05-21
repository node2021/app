import { Component, ViewChild, ElementRef } from '@angular/core';
import firebase from 'firebase/app';
import { NavController } from '@ionic/angular';

import { UtilService } from '../../services/util.service';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { MapPage} from '../map/map.page';
import { ModalController } from '@ionic/angular';
import 'firebase/auth';
import 'firebase/firestore';

declare var google;

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})

// This page is to display the history of the trips
export class HistoryPage{

  user = null;
  pathTravelled : any ;

  myaddress: any[] = [];
  dummy = Array(10);

  constructor(private afs: AngularFirestore,     private navCtrl: NavController, public util: UtilService,public modalController: ModalController,) { 
    this.anonLogin();
  }

  ionViewWillEnter() {
    
  }

  go_back(){
    this.navCtrl.back();
  }

  // Perform an anonymous login and load data
  anonLogin() {
    firebase.auth().onAuthStateChanged(user => { 
      this.user = user;

      this.get_locationlist();
      
    });
  }

  get_locationlist(){
    this.getMyAddress_api(this.user.uid).then((data) => {
      console.log('my address', data);
      this.dummy = [];
      this.myaddress=[];
      if (data && data.length>0) {
        this.myaddress = data;
      }
      console.log(this.myaddress);

    }, error => {
      console.log(error);
      this.dummy = [];
    }).catch(error => {
      console.log(error);
      this.dummy = [];
    });      
  }


   getMyAddress_api(uid: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('locations').doc(uid).collection('track', ref => ref.orderBy('timestamp','desc')).get().subscribe((data) => {
        var addresses = data.docs.map(doc => {
          var item = doc.data();
          item.id = doc.id;
          return item;
        });
        resolve(addresses);
      }, error => {
        reject(error);
      });
    });
  }

  del(item){
    console.log(item);
    this.util.show("Delete...");
    this.deleteAddress_api(this.user.uid, item.id).then(data => {
      this.util.hide();
      this.util.showToast("Location deleted successfully",'success','bottom');

      this.get_locationlist();
    }).catch(error => {
      console.log(error);
      this.util.errorToast("Failed to delete a Location!");
      this.util.hide();
    });
  }

  deleteAddress_api(uid, id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('locations').doc(uid).collection('track').doc(id).delete().then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }

  async open_map(item){
    console.log(item);

    const modal = await this.modalController.create({
      component: MapPage,
      cssClass: 'modal-css-height-100',
     // showBackdrop: true,
      backdropDismiss: false,
      componentProps: {
        'lat': item.lat,
        'lng': item.lng,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {

    });
      await modal.present().then(() => {
    });
  }
}