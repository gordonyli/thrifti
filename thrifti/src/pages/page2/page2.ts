import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Geolocation, Camera, File, Transfer, FilePath } from 'ionic-native';
import { Http, Headers, RequestOptions } from '@angular/http';

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
    userinput: any = {Title: "", Description: "", ShowEmail: false, ShowPhone: false};

    constructor(public navCtrl: NavController, public params: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public platform: Platform, public http:Http) {
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
            subTitle: 'COORDINATES: ' + this.marker.getPosition().lat(),
            buttons: ['OK']
        });
        alert.present();
        let alert2 = this.alertCtrl.create({
            title: 'User input',
            subTitle: 'DATA: ' + JSON.stringify(this.userinput),
            buttons: ['OK']
        });
        alert2.present();
    }

    submitPost() {
        var url = "http://138.197.43.183:3000/api/image/upload";
        var headers = new Headers({'Content-Type': 'application/json'});
        var options = new RequestOptions({headers: headers});
        console.log(this.params.get("id"));
        if(this.userinput.Title == null || this.userinput.Title == "") {
            this.alertCtrl.create({
                title: 'Your post must have a title',
                subTitle: '',
                buttons: ['OK']
            }).present();
            return;
        }
        if(this.userinput.Description == null || this.userinput.Description == "") {
            this.alertCtrl.create({
                title: 'Your post must have a description',
                subTitle: '',
                buttons: ['OK']
            }).present();
            return;
        }
        if(this.base64Image == null) {
            this.alertCtrl.create({
                title: 'Must upload an image',
                subTitle: '',
                buttons: ['OK']
            }).present();
            return;
        }
        this.http.post(url, JSON.stringify({data: this.base64Image}), options).subscribe(res => {
            var imgname = "http://138.197.43.183:3030/" + res.text();
            imgname = encodeURIComponent(imgname);
            var url2 = "http://138.197.43.183:3000/api/item/new/" + this.params.get("id");
            url2 = url2 + "/" + this.userinput.Title + "/" + this.userinput.Description;
            url2 = url2 + "/" + Number(this.marker.getPosition().lat().toFixed(6)) + "/" + Number(this.marker.getPosition().lng().toFixed(6));
            if(this.userinput.ShowPhone == true) {
                url2 = url2 + "/1";
            } else {
                url2 = url2 + "/0";
            }
            if(this.userinput.ShowEmail == true) {
                url2 = url2 + "/1";
            } else {
                url2 = url2 + "/0";
            }
            url2 = url2 + "/" + imgname;
            this.http.post(url2, "").subscribe(res => {
                let alert = this.alertCtrl.create({
                    title: 'Confirmation',
                    subTitle: 'Item has been posted successfully!',
                    buttons: ['OK']
                });
                alert.present();
                this.navCtrl.pop();
            }, (err) => {
            })
        }, (err) => {
        });
    }
}
