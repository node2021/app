import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { UtilService } from '../../services/util.service';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


declare var google;

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {

  saveflag=false;
	@ViewChild('map', { static: true }) mapEle: ElementRef;
	@ViewChild('placesRef', { static: false }) placesRef: GooglePlaceDirective;

  map: any;
  marker: any;
  lat: any;
  lng: any;
  address: any;


  // Firebase Data
  locations: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;
  user = null;
  
  constructor(private route: Router,private afs: AngularFirestore,    public util: UtilService,  private ngZone: NgZone,  public geolocation: Geolocation  ) {
    this.anonLogin();
    this.lat= 53.34507319942192;
		this.lng=-6.254235003125004;
  }
  
  ionViewWillEnter() {
    this.getUserPosition();
  }


  // Perform an anonymous login and load data
  anonLogin() {
    firebase.auth().onAuthStateChanged(user => { 
      this.user = user;

       
      console.log('userid is  '+this.user)
      
    if (this.user === null) {
        console.log(user + ' === null . User has to login ');
        this.route.navigate(['login']);
        return;
    }
    if (this.user == null) {
      console.log(user + '  uid === null . User has to login ');
      this.route.navigate(['login']);
      return;
   }
 
 
      this.locationsCollection = this.afs.collection(
        `locations/${this.user.uid}/track`,
        ref => ref.orderBy('timestamp')
      );
    });
  }

  getUserPosition(){
    var options = { enableHighAccuracy: true  ,timeout: 15000,  maximumAge: 3600};

    this.geolocation.getCurrentPosition(options).then((resp) => {
      if (resp) {
        console.log('----get position-------', resp);
        this.loadmap(resp.coords.latitude, resp.coords.longitude, this.mapEle);
        this.getAddress(resp.coords.latitude, resp.coords.longitude);
      }else{
        console.log('----dont get position-------', resp);
        this.setDefaultpoisition();

      }
    }).catch((error) => {

      console.log('------get position error----', error);
      this.setDefaultpoisition();

    });
  }

  public setDefaultpoisition(){
    this.loadmap(this.lat,this.lng, this.mapEle);
    this.getAddress(this.lat,this.lng);
  }

  public handleAddressChange(address: Address) {
    this.loadmap(address.geometry.location.lat(),address.geometry.location.lng(), this.mapEle);
    this.getAddress(address.geometry.location.lat(),address.geometry.location.lng());
  }

  loadmap(lat, lng, mapElement) {
    const location = new google.maps.LatLng(lat, lng);
    const style = [
      {
        featureType: 'poi',
        elementType: 'all',
     
      }
    ];

    const mapOptions = {
      zoom: 10,
      streetViewControl: false,
      zoomControl: true,
      overviewMapControl: false,
      center: location,
      mapTypeControl: false,        
    };
    
    this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);
    var mapType = new google.maps.StyledMapType(style, { name: 'Grayscale' });
    this.map.mapTypes.set('Pet', mapType);
    this.map.setMapTypeId('Pet');
    this.addMarker(location);

  }

  getAddress(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    const location = new google.maps.LatLng(lat, lng);

    this.address = "";
    this.saveflag=true;

    geocoder.geocode({ 'location': location }, (results, status) => {
      console.log(results);
      if (status=='OK'){
        this.ngZone.run(() => {
          this.address = results[0].formatted_address;
          this.lat = lat;
          this.lng = lng;
        });
      }else{
        this.ngZone.run(() => {
          this.lat = lat;
          this.lng = lng;       
        });
      }
    });
  }



  addMarker(location) {
 
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP
    })


    let thisObj = this;
    this.map.addListener('click', function (e) {
      thisObj.marker.setPosition(e.latLng);
      thisObj.getAddress(e.latLng.lat(),e.latLng.lng());
    });

    this.marker.addListener('dragend', function (e) {
      console.log("----dragend pin ----",e.latLng.lat(),e.latLng.lng());
      thisObj.marker.setPosition(e.latLng); 
      thisObj.getAddress(e.latLng.lat(),e.latLng.lng());
    });


  }

  geolocateMe(){
    var options = { enableHighAccuracy: true  ,timeout: 15000,  maximumAge: 3600};

    this.geolocation.getCurrentPosition(options).then(position => {
      const current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
      this.loadmap(position.coords.latitude,position.coords.longitude, this.mapEle);   
      this.getAddress(position.coords.latitude, position.coords.longitude);
    }).catch((error) => {
      console.log('Error getting current location', error);
      this.setDefaultpoisition();
    }).finally(() =>   console.log('Finallay getting current location'));
    
  }

  save(){
    
    this.util.show();
    var self=this;

    this.locationsCollection.add({
      lat:this.lat,
      lng:this.lng,
      address:this.address,
      timestamp:new Date().getTime(),
    }).then(function(snapshot) {
      self.util.hide();
      self.util.showToast("Location saved successfully",'success','bottom');
      console.log("your location saved");                
      self.saveflag=false;      
    }).catch(function(error) {
      console.log(error);
      self.util.hide();
      self.util.errorToast("Failed to save Location!");
      
    });

  }

}
