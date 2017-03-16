import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;
declare var marker;

@Component({
    selector: 'page-browsePage',
    templateUrl: 'browse-page.html'
})
export class BrowsePage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    marker: any;
    radius: any;
    circle: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        this.loadMap();
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
        Geolocation.getCurrentPosition().then((position) => {
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
