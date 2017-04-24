import { Component } from '@angular/core';
import { AdMob } from 'ionic-native';

import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { BrowsePage } from '../browse-page/browse-page';
import { SettingsPage } from '../settings-page/settings-page';
import { ListingsPage } from '../listings-page/listings-page';
import { Page2 } from '../page2/page2';
import {enableProdMode} from '@angular/core';
import { Http } from '@angular/http';

enableProdMode();

@Component({
    selector: 'page-page1',
    templateUrl: 'page1.html'
})
export class Page1 {
    admobId: any;
    page2 = Page2;
    browsePage = BrowsePage;
    settingsPage = SettingsPage;
    listingsPage = ListingsPage;
    username: any;
    myparams: any;
    name: any;
    constructor(public platform: Platform, public navCtrl: NavController, public params: NavParams, public http: Http, public alertCtrl: AlertController) {
        // // set up ads
        // this.platform = platform;
        // if(/(android)/i.test(navigator.userAgent)) {
        //     this.admobId = 'ca-app-pub-1726770273132324/5274522897';
        // } else {
        //     this.admobId = 'ca-app-pub-1726770273132324/8227989298';
        // }
        // this.platform.ready().then(() => {
        //     if(AdMob) {
        //         AdMob.createBanner({
        //             adId: this.admobId,
        //             adSize: 'MEDIUM_RECTANGLE',
        //             autoShow: true,
        //             isTesting: true
        //         }).then(() => {
        //             AdMob.showBanner(8);
        //         });
        //     }
        // });
        this.username = params.get("username");
        this.myparams = {username: params.get("username"), name: params.get("name")};
        this.loadUserID();
    }

    loadUserID() {
        var url = "http://138.197.43.183:3000/api/user/name/" + this.username;
        this.http.get(url).subscribe(res => {
            var result = res.json().Id;
            this.myparams.id = result;
            this.name = res.json().Name;
        }, (err) => {
            let alert2 = this.alertCtrl.create({
                title: 'ERROR',
                subTitle: err.toString(),
                buttons: ['OK']
            });
            alert2.present();
        });
    }

    loadUserItems() {
        var url = "http://138.197.43.183:3000/api/item/user/" + this.myparams.id;
        this.http.get(url).subscribe(res => {
            this.myparams.userItems = res.json();
            this.navCtrl.push(this.listingsPage, this.myparams);
        }, (err) => {
            let alert3 = this.alertCtrl.create({
                title: 'ERROR',
                subTitle: 'Could not load user items, please try again later.',
                buttons: ['OK']
            });
            alert3.present();
        });
    }
}
