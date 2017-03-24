import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
// import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../page1/page1';
import { Page2 } from '../page2/page2';
import { BrowsePage } from '../browse-page/browse-page'
import { SettingsPage } from '../settings-page/settings-page'


@Component({
    templateUrl: 'main-page.html'
})
export class MainPage {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = Page1;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform) {
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: Page1 },
            { title: 'Post an Item', component: Page2 },
            { title: 'Browse', component: BrowsePage},
            { title: 'Settings', component: SettingsPage}

        ];

    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
