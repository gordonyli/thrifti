import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

// import { Page1 } from '../page1/page1';
import { MainPage } from '../main-page/main-page';

@Component({
    templateUrl: 'login-page.html'
})
export class LoginPage {
    login: any = {};

    constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    }

    doLogin() {
        console.log("HI MOM");
        if(this.login.user == "test" && this.login.pass == "test123") {
            this.navCtrl.setRoot(MainPage);
        }
        else {
            let alert = this.alertCtrl.create({
                title: 'Login failed',
                subTitle: 'Please check your username and password',
                buttons: ['Dismiss']
            });
            alert.present();
        }
    }
}
