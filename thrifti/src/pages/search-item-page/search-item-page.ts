import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

declare var google;

@Component({
    selector: 'page-search-page',
    templateUrl: 'search-item-page.html'
})
export class SearchItemPage {
    test: any = "testing";
    items: any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http:Http) {
        this.items = navParams.get("itemList");
    }

  ionViewDidLoad() {
    console.log(this.items);
  }
}
