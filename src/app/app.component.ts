import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject } from '@ionic-native/push';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    public alertCtrl: AlertController, public push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initPushNotification();
    });
  }

  initPushNotification(){
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    const pushObject:PushObject = this.push.init({
      android: {
        senderID: "484633744467"
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true"
      },
      windows: {}
    });

    pushObject.on('notification').subscribe((notification: any) => {
     console.log('Received a notification', notification);
     let alert = this.alertCtrl.create({
        title : notification.title,
        subTitle : "subtitle",
        buttons : ['Dismiss']
      });
     alert.present();
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}
