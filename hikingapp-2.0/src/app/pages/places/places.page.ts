import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
declare var google;


@Component({
	selector: 'app-places',
	templateUrl: './places.page.html',
	styleUrls: ['./places.page.scss'],
})

// Places is used for the applicaiton to store all the hiking places
// All the hiking places are filterd based on the user location to display the nearby hiking spots.

export class PlacesPage {

	@ViewChild('map', { static: true }) mapEle: ElementRef;
	@ViewChild('placesRef', { static: false }) placesRef: GooglePlaceDirective;
	
	map: any;
	marker: any;
	address: any;

	latOri : any;
	lngOri : any;
	latDest: any;
	lngDest: any;

	your_address:any;

	distance:any;
	duration:any;

	constructor(  private ngZone: NgZone,    public geolocation: Geolocation) {
		this.latOri= 53.34507319942192;
		this.lngOri=-6.254235003125004;

		this.latDest= 53.34507319942192;
		this.lngDest=-6.254235003125004;
		this.address="";
		this.your_address=" ";
	}

	ionViewWillEnter() {
		this.getUserPosition();
	}


	 getUserPosition(){
		var options = { enableHighAccuracy: true  ,timeout: 15000,  maximumAge: 3600};
	
		this.geolocation.getCurrentPosition(options).then((resp) => {
		  if (resp) {
			console.log('----get position-------', resp);
			this.latOri=resp.coords.latitude;
			this.lngOri=resp.coords.longitude;

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

	  check_flag(){
		if (this.latOri==this.latDest && this.lngOri==this.lngDest){
			return false
		}else{
			return true;
		}
	  }

	  public setDefaultpoisition(){

		this.latOri= 53.34507319942192;
		this.lngOri=-6.254235003125004;

		this.latDest= 53.34507319942192;
		this.lngDest=-6.254235003125004;
		
		this.loadmap(this.latDest,this.lngDest, this.mapEle);
		this.getAddress(this.latDest,this.lngDest);
	  }
	
	  public handleAddressChange(address: Address) {

		this.loadmap(address.geometry.location.lat(),address.geometry.location.lng(), this.mapEle);
		this.getAddress(address.geometry.location.lat(),address.geometry.location.lng());
		return;
	
	  }
	

     loadmap(latDest, lngDest, mapElement) {


		var destinationIcon = 'https://chart.googleapis.com/chart?' +
		  'chst=d_map_pin_letter&chld=D|FF0000|000000';
		var originIcon = 'https://chart.googleapis.com/chart?' +
		  'chst=d_map_pin_letter&chld=O|FFFF00|000000';
	
		var map = new google.maps.Map(mapElement.nativeElement, {
		  center: { lat: this.latOri, lng: this.lngOri },
		  disableDefaultUI: true,
		  streetViewControl: false,
		  zoomControl: false,
		  overviewMapControl: false,
		  mapTypeControl: false,
		  zoom: 15
		});

		this.latDest=latDest;
		this.lngDest=lngDest;

		const userPos = new google.maps.LatLng(this.latOri, this.lngOri);
		const destPos = new google.maps.LatLng(this.latDest, this.lngDest);
		// console.log("------show position-----");
		// console.log(userPos);
		// console.log(destPos);

	
		// const home_icon = {
		//   url: 'assets/imgs/pin.png',
		//   scaledSize: new google.maps.Size(20, 30), // scaled size
		//   origin: new google.maps.Point(0, 0), // origin
		//   anchor: new google.maps.Point(0, 0) // anchor
		// };
	
		// const establishment_icon = {
		//   url: 'assets/icon/establishment.png',
		//   scaledSize: new google.maps.Size(30, 30), // scaled size
		//   origin: new google.maps.Point(0, 0), // origin
		//   anchor: new google.maps.Point(0, 0) // anchor
		// };
	
		var marker_user = new google.maps.Marker({
		  map: map,
		  position: userPos,
		  animation: google.maps.Animation.DROP,
		  icon:originIcon
		});
	
		var marker_dest = new google.maps.Marker({
		  map: map,
		  position: destPos,
		  animation: google.maps.Animation.DROP,
		  icon:destinationIcon,
		  draggable: true,
		});
	
		
		marker_user.setMap(map);	
		marker_dest.setMap(map);
	  
		  this.marker=marker_dest;
		  let thisObj = this;

		  var directionsService = new google.maps.DirectionsService;
		  var directionsDisplay = new google.maps.DirectionsRenderer;
		  
		  directionsDisplay = new google.maps.DirectionsRenderer();
		  directionsDisplay.setMap(map);
		  directionsDisplay.setOptions({
			polylineOptions: {
			  strokeWeight: 4,
			  strokeOpacity: 1,
			  strokeColor: 'red'
			},
			suppressMarkers: true,
			preserveViewport: true

		  });


		  map.addListener('click', function (e) {
			thisObj.marker.setPosition(e.latLng);
			thisObj.getAddress(e.latLng.lat(),e.latLng.lng());
		    thisObj.latDest=e.latLng.lat();
			thisObj.lngDest=e.latLng.lng();
			directionsDisplay.preserveViewport=false;
			thisObj.chanage_route(directionsService,directionsDisplay);
		  });
	  
		  this.marker.addListener('dragend', function (e) {
			console.log("----dragend pin ----",e.latLng.lat(),e.latLng.lng());
			thisObj.marker.setPosition(e.latLng); 
			thisObj.getAddress(e.latLng.lat(),e.latLng.lng());
			thisObj.latDest=e.latLng.lat();
			thisObj.lngDest=e.latLng.lng();
			directionsDisplay.preserveViewport=false;
			thisObj.chanage_route(directionsService,directionsDisplay);
		  });
	
		 this.chanage_route(directionsService,directionsDisplay);	
	  }


	  chanage_route(directionsService,directionsRenderer ) {

		var origin1 = { lat: parseFloat(this.latOri), lng: parseFloat(this.lngOri) };
		var destinationA =  { lat: parseFloat(this.latDest), lng: parseFloat(this.lngDest) };


		  var service = new google.maps.DistanceMatrixService;
		  var total_distance = 0;
		  var total_seconds = 0;
		
		  var self=this;

		  service.getDistanceMatrix({
			origins: [origin1],
			destinations: [destinationA],
			travelMode: 'WALKING',
			unitSystem: google.maps.UnitSystem.METRIC,
			avoidHighways: false,
			avoidTolls: false
		  }, function (response, status) {
			if (status !== 'OK') {
			  alert('Error was: ' + status);
			} else {
			  var originList = response.originAddresses;
			  var destinationList = response.destinationAddresses;
				
			  console.log(response);

			  directionsService.route({
				origin: origin1,
				destination: destinationA,
				travelMode: 'WALKING'
			  }, function (response, status) {
				if (status === 'OK') {
					directionsRenderer.setDirections(response);
				} else {
				  window.alert('Directions request failed due to ' + status);
				}
			  });
	  
	  
			  for (let i = 0; i < originList.length; i++) {
				let results = response.rows[i].elements;
				for (let j = 0; j < results.length; j++) {
					total_distance+=results[j].distance.value;	  
					total_seconds+=results[j].duration.value;	  
					self.distance=results[j].distance.text;
					self.duration=results[j].duration.text;
				}
	
				//console.log("total distance------" + total_distance);
			  }

			  console.log(self.distance);
			  console.log(self.duration);

			}
		  });


	  }

	
	  getAddress(lat, lng) {
		const geocoder = new google.maps.Geocoder();
		const location = new google.maps.LatLng(lat, lng);

		this.address = "";
		this.latDest = lat;
		this.lngDest = lng;

		geocoder.geocode({ 'location': location }, (results, status) => {
		 // console.log(results);
		  if (status=='OK'){
			this.ngZone.run(() => {
			  this.address = results[0].formatted_address;
			  if (this.latOri==this.latDest && this.lngOri==this.lngDest){
			    this.your_address=results[0].formatted_address;
				this.address="";
			  }
			});
		  }else{
			this.ngZone.run(() => {		
			  this.address = "";
			});
		  }	
		});
	  }

	
	
	  addDestMarker(location) {
		console.log('location =>', location)
	
		var destinationIcon = 'https://chart.googleapis.com/chart?' +
		'chst=d_map_pin_letter&chld=D|FF0000|000000';

		this.marker = new google.maps.Marker({
		  position: location,
		  map: this.map,
		  icon:destinationIcon,
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
	

}
