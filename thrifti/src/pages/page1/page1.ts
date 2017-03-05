import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BrowsePage} from '../browse-page/browse-page';
import { Page2 } from '../page2/page2';
import {enableProdMode} from '@angular/core';

enableProdMode();

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  page2 = Page2; 
  browsePage = BrowsePage;
  constructor(public navCtrl: NavController) {
    
  }

}
