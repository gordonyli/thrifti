import { Component} from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

import { DetailPage } from '../detail-page/detail-page';

@Component({
    selector: 'page-listingsPage',
    templateUrl: 'listings-page.html'
})
export class ListingsPage {
    myData: any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http:Http) {
        this.myData = this.navParams.get("userItems");
        if(this.myData.length == 0) {
            let alert = this.alertCtrl.create({
                title: "No Listings",
                subTitle: "You have no Thrifti listings",
                buttons: ['OK']
            });
            alert.present();
            navCtrl.pop();
        }
    }

    deleteConfirm(i) {
        let alert2 = this.alertCtrl.create({
            title: "Confirm Delete",
            // subTitle: i.Id,
            subTitle: "Are you sure you want to delete this item?",
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        var url = "http://138.197.43.183:3000/api/item/delete/" + i.Id;
                        this.http.get(url).subscribe(res => {
                            let alert3 = this.alertCtrl.create({
                                title: "Item successfully deleted",
                                buttons: ['OK']
                            });
                            alert3.present();
                            this.navCtrl.pop();
                        }, (err) => {
                            let alert4 = this.alertCtrl.create({
                                title: "ERROR",
                                subTitle: "There was an issue with deleting the item, please try again later.",
                                buttons: ['OK']
                            });
                            alert4.present();
                        });
                    }
                },
                {
                    text: 'No',
                    role: 'cancel',
                    handler: () => {}
                }]
        });
        alert2.present();
    }

    gotoDetail(i) {
        var url = "http://138.197.43.183:3000/api/user/id/" + i.UserId;
        this.http.get(url).subscribe(res => {
            var response = res.json();
            i.Phone = response.Phone;
            i.Email = response.Email;
            this.navCtrl.push(DetailPage, {itemInfo: i});
        }, (err) => {
            let alert = this.alertCtrl.create({
                title: 'Could not connect to Thrifti',
                subTitle: 'Please check your Internet connection',
                buttons: ['Dismiss']
            });
            alert.present();
        });
    }
}
