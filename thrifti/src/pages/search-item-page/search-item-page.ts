import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetailPage } from '../detail-page/detail-page';

declare var google;

@Component({
    selector: 'page-search-page',
    templateUrl: 'search-item-page.html'
})
export class SearchItemPage {
    test: any = "testing";
    items: any = [];
    response: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http:Http) {
        this.items = navParams.get("itemList");
    }

    ionViewDidLoad() {
        console.log(this.items);
    }

    viewDetails(itemid) {
        var temp = null;
        for(var i in this.items) {
            if(parseInt(this.items[i].Id) == parseInt(itemid)) {
                temp = this.items[i];
                break;
            }
        }
        if(temp !== null) {
            var url = "http://138.197.43.183:3000/api/user/id/" + temp.UserId;
            this.http.get(url).subscribe(res => {
                this.response = res.json();
                temp.Phone = this.response.Phone;
                temp.Email = this.response.Email;
                this.navCtrl.push(DetailPage, {itemInfo: temp});
            }, (err) => {
                let alert = this.alertCtrl.create({
                    title: 'Could not connect to Thrifti',
                    subTitle: 'Please check your Internet connection',
                    buttons: ['Dismiss']
                });
                alert.present();
            });
        } else {
        }
    }
}
