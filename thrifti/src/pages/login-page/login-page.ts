import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

// import { Page1 } from '../page1/page1';
import { MainPage } from '../main-page/main-page';
import { RegisterPage } from '../register-page/register-page';

@Component({
    selector: "page-login",
    templateUrl: 'login-page.html'
})
export class LoginPage {
    login: any = {};

    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public http:Http) {
    }

    gotoRegister() {
        this.navCtrl.push(RegisterPage);
    }
    doLogin() {
        var url = "http://138.197.43.183:3000/api/user/login/" + this.login.user + "/" + this.login.pass;
        this.http.get(url).subscribe(res => {
            var result = res.text();
            if(result == "1") {
                this.navCtrl.setRoot(MainPage, {username: this.login.user});
            }
            else {
                let alert = this.alertCtrl.create({
                    title: 'Incorrect Login',
                    subTitle: 'Please verify your credentials and try again.',
                    buttons: ['Dismiss']
                });
                alert.present();
            }
        }, (err) => {
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Thrifti encountered an error, please try to log in later.',
                buttons: ['Dismiss']
            });
            alert.present();
        });
        //if(this.login.user == "test" && this.login.pass == "test123") {
        //    this.navCtrl.setRoot(MainPage);
        //}
        // else {
        //     let alert = this.alertCtrl.create({
        //         title: 'Login failed',
        //         subTitle: 'Please check your username and password',
        //         buttons: ['Dismiss']
        //     });
        //     alert.present();
        // }
    }
}
