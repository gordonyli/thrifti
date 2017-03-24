import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Geolocation, Camera, File, Transfer, FilePath } from 'ionic-native';

declare var google;
declare var marker;

@Component({
    selector: 'page-page2',
    templateUrl: 'page2.html'
})
export class Page2 {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    selectedItem: any;
    marker: any;
    icons: string[];
    items: Array<{title: string, note: string, icon: string}>;
    lastImage: any;
    base64Image: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public platform: Platform) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
                      'american-football', 'boat', 'bluetooth', 'build'];

        this.items = [];
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }

    takePicture(st) {
        // var options = {
        //     quality: 100,
        //     sourceType: sourceType,
        //     saveToPhotoAlbum: false,
        //     correctOrientation: true
        // };
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 500,
            targetHeight: 500,
            sourceType: st,
            correctOrientation: true
        }).then((imagedata) => {
            this.base64Image = "data:image/jpeg;base64," + imagedata
        }, (err) => {
            console.log(err);
        });
        // Camera.getPicture(options).then((imagePath) => {
        //     if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        //         FilePath.resolveNativePath(imagePath)
        //             .then(filePath => {
        //                 let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        //                 let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        //                 this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        //             });
        //     } else {
        //         var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        //         var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //         this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        //     }
        // }, (err) => {
        //     console.log(err);
        // })
    }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        // this.navCtrl.push(Page2, {
        //   item: item
        // });
        //  var confirmPopup = $ionicPopup.confirm({
        //   title: 'Consume Ice Cream',
        //   template: 'Are you sure you want to eat this ice cream?'
        // });
        alert("Posted");
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
        google.maps.event.addListener(this.map, "click", (event) => {
            var latitude = event.latLng.lat();
            var longitude = event.latLng.lng();
            // console.log("CLICKED " + latitude + " :: " + longitude + " :: ");
            this.marker.setPosition(new google.maps.LatLng(latitude, longitude));
        });
        Geolocation.getCurrentPosition().then((position) => {
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            this.map.setCenter(latLng);
            this.marker.setPosition(latLng);
        })
    }

    alertData() {
        let alert = this.alertCtrl.create({
            title: 'Clicked coordinates',
            subTitle: 'COORDINATES: ' + this.marker.getPosition(),
            buttons: ['OK']
        });
        alert.present();
    }
}
