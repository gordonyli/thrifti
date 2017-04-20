import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
    selector: 'page-detailPage',
    templateUrl: 'detail-page.html',
    providers: [InAppBrowser]
})
export class DetailPage {

    data: any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private iab: InAppBrowser) {
        this.data = navParams.get("itemInfo");
    }

    openDirections() {
        var browser = this.iab.create('https://www.google.com/maps/dir/\'' + this.data.UserLat + ',' + this.data.UserLong + '\'/\'' + this.data.Latitude + ',' + this.data.Longitude + '\'/',
                                      '_system', 'location=yes,toolbar=yes,closebuttoncaption=Back');
    }

}
