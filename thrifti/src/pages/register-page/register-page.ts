import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
// import { SearchItemPage } from '../search-item-page/search-item-page';

@Component({
    selector: 'page-registerPage',
    templateUrl: 'register-page.html'
})
export class RegisterPage {

    userinput: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http:Http) {
        this.userinput = {};
        this.userinput.username = "";
        this.userinput.password = "";
        this.userinput.name = "";
        this.userinput.email = "";
        this.userinput.phone = "";
    }

    doRegister() {
        if(this.userinput.username == "" || this.userinput.password == "" || this.userinput.name == "" ||
           this.userinput.email == "" || this.userinput.phone == "") {
            let alert = this.alertCtrl.create({
                title: 'Missing Data',
                subTitle: 'Please fill out entire form.',
                buttons: ['OK']
            });
            alert.present();
        } else {
            var url = "http://138.197.43.183:3000/api/user/new/" + this.userinput.username +
                "/" + this.userinput.password +
                "/" + this.userinput.name +
                "/" + this.userinput.email +
                "/" + this.userinput.phone + "/test";
            this.http.post(url, "fakedata").subscribe(res => {
                let salert = this.alertCtrl.create({
                    title: 'Account created',
                    buttons: ['OK']
                });
                salert.present();
                this.navCtrl.pop();
            }, (err) => {
                let talert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Thrifti encountered an error while processing your request, please try again later.',
                    buttons: ['Dismiss']
                });
                talert.present();
            });
        }
    }
}
