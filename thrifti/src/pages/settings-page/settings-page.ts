import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
    selector: 'page-settingsPage',
    templateUrl: 'settings-page.html'
})
export class SettingsPage {
    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    }
}
