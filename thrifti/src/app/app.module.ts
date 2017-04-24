import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { BrowsePage } from '../pages/browse-page/browse-page';
import { MainPage } from '../pages/main-page/main-page';
import { LoginPage } from '../pages/login-page/login-page';
import { SettingsPage } from '../pages/settings-page/settings-page';
import { SearchItemPage } from '../pages/search-item-page/search-item-page';
import { DetailPage } from '../pages/detail-page/detail-page';
import { RegisterPage } from '../pages/register-page/register-page';
import { ListingsPage } from '../pages/listings-page/listings-page';


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    BrowsePage,
    MainPage,
    LoginPage,
    SettingsPage,
    SearchItemPage,
    DetailPage,
    RegisterPage,
    ListingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    BrowsePage,
    MainPage,
    LoginPage,
    SettingsPage,
    SearchItemPage,
    DetailPage,
    RegisterPage,
    ListingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
