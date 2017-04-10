import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';
import { SearchItemPage } from '../search-item-page/search-item-page';

declare var google;
declare var marker;

@Component({
    selector: 'page-browsePage',
    templateUrl: 'browse-page.html'
})
export class BrowsePage {

    @ViewChild('map') mapElement: ElementRef;
    lat: any;
    long: any;
    search: any = "";
    map: any;
    marker: any;
    radius: any = 1;
    circle: any;
    test: any = "testing";
    items: any = [];
    response: any = [];
    dummylist: any = [
      {"name": "hello"},
      {"name": "gordon"},
      {"name": "bruck"}
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http:Http) {
    }

    doSearch() {
      this.items = [];
      this.getItems();

    }

    ionViewDidLoad() {
        this.loadMap();
        //this.getItems();
    }

    generateArray(obj){
      return Object.keys(obj).map((key)=>{ return obj[key]});
    }

    getItems() {
      var url = "http://138.197.43.183:3000/api/item/search/" +
        this.lat + "/" + this.long + "/" + this.radius + "/" + this.search
      this.http.get(url).subscribe(res => {
        this.response = res.json();
        for(var i = 0; i < this.response.length; i++) {
            var temp = this.response[i];
            temp.UserLat = this.lat;
            temp.UserLong = this.long;
          this.items.push(temp);
        }
        console.log(this.items);
          console.log("Latitude: " + this.lat);
          console.log("Longitude: " + this.long);
          console.log("Radius: " + this.radius);
          console.log("Search Name: " + this.search);
          this.navCtrl.push(SearchItemPage, {
              itemList: this.items
          });
      }, (err) => {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'No items found',
          buttons: ['Dismiss']
        });
        alert.present();
        // this.navCtrl.pop()
      });
    }

    loadMap() {
        let latLng = new google.maps.LatLng(-34.9290, 138.6010);
        let mapOptions = {
            center: latLng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        })
        this.circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.map,
            center: this.map.getCenter(),
            radius: 1609.34 //One mile in meters
        });
        google.maps.event.addListener(this.map, "click", (event) => {
            var latitude = event.latLng.lat();
            var longitude = event.latLng.lng();
            this.lat = latitude;
            this.long = longitude;
            this.marker.setPosition(new google.maps.LatLng(latitude, longitude));
            this.circle.setCenter(new google.maps.LatLng(latitude, longitude));
        });
        google.maps.event.addListener(this.circle, "click", (event) => {
            var latitude = event.latLng.lat();
            var longitude = event.latLng.lng();
            this.lat = latitude;
            this.long = longitude;
            this.marker.setPosition(new google.maps.LatLng(latitude, longitude));
            this.circle.setCenter(new google.maps.LatLng(latitude, longitude));
        });
        Geolocation.getCurrentPosition().then((position) => {
            this.lat = position.coords.latitude;
            this.long = position.coords.longitude;
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            this.map.setCenter(latLng);
            this.marker.setPosition(latLng);
            this.circle.setCenter(latLng);
        })
    }

    searchtest() {
        let alert = this.alertCtrl.create({
            title: 'Radius:',
            subTitle: '' + this.radius,
            buttons: ['OK']
        });
        alert.present();
    }

    updateMapCircle() {
        console.log("TESTING TESTING");
        this.circle.setRadius(this.radius * 1609.34);
    }
}
