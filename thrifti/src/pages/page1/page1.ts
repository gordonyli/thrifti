import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BrowsePage } from '../browse-page/browse-page';
import { SettingsPage } from '../settings-page/settings-page';
import { Page2 } from '../page2/page2';
import {enableProdMode} from '@angular/core';
import { Http } from '@angular/http';

enableProdMode();

@Component({
    selector: 'page-page1',
    templateUrl: 'page1.html'
})
export class Page1 {
    page2 = Page2;
    browsePage = BrowsePage;
    settingsPage = SettingsPage;
    username: any;
    myparams: any;
    name: any;
    constructor(public navCtrl: NavController, public params: NavParams, public http: Http, public alertCtrl: AlertController) {
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
}
