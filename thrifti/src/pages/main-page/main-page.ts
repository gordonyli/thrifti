import { Component, ViewChild } from '@angular/core';
import { Nav, NavParams, Platform, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
// import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../login-page/login-page';
import { Page1 } from '../page1/page1';

@Component({
    templateUrl: 'main-page.html'
})
export class MainPage {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = Page1;

    myparams: any;
    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public params: NavParams, public http: Http, public alertCtrl: AlertController) {
        // used for an example of ngFor and navigation
        this.myparams = {username: params.get("username")};
        this.pages = [
            { title: 'Logout', component: LoginPage },
        ];
        this.loadUserID();
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component, this.myparams);
    }

    loadUserID() {
        var url = "http://138.197.43.183:3000/api/user/name/" + this.myparams.username;
        this.http.get(url).subscribe(res => {
            var result = res.json().Id;
            this.myparams.id = result;
            this.myparams.name = res.json().Name;
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
