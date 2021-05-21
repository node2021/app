import { Component,NgZone, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams  } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map', { static: true }) mapEle: ElementRef;
  map: any;
  marker: any;

  lat:any;
  lng:any;

  constructor( private modalController: ModalController,private ngZone: NgZone,  private navParams: NavParams) { 
    if (this.navParams && this.navParams.data.lat &&this.navParams.data.lng ){
      this.lat=this.navParams.data.lat;
      this.lng=this.navParams.data.lng;
    }else{
      this.closeModal();
    }    
  }

  ngOnInit() {
  

  }

  ionViewDidEnter() {
    this.loadmap(this.lat,this.lng, this.mapEle);
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
      mapTypeControl: false    
    };
    
    this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);
    this.addMarker(location);
  }
 
  addMarker(location) {
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: false,
      animation: google.maps.Animation.DROP
    })
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
