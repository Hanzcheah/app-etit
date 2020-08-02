import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {OrderTypePage} from './pages/ordertype/ordertype';
import {OrderService} from './providers/order-service/order-service';
import {Device} from 'ionic-native';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HomePage} from "./pages/home/home";
import {UpdatePage} from "./pages/updatepage/updatepage";
import {LoadingController} from 'ionic-angular'
;



@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [OrderService],
})
export class MyApp {
  rootPage: any;
  posts:any;
  uuid:any;

  constructor(platform: Platform, private http: Http, public loadingController:LoadingController) {

   let loader = this.loadingController.create({content:"Loading..."});
        loader.present();

        this.uuid = Device.device.uuid







    platform.ready().then(() => {

    this.uuid = Device.device.uuid


  //   this.http.get('https://ldeify.com/cuser/?caa=' + encodeURI(this.uuid))
  // .subscribe(data => {
  //   this.posts = data['_body'];
  //   console.log(this.posts)
      // if (this.posts == 'OK'){


              this.http.get('https://ldeify.com/updateboolean/?v=1.4.0')
              .subscribe(data => {
                this.posts = data['_body'];
                  if (this.posts == 'OK'){
              this.rootPage = OrderTypePage;
                             loader.dismiss();
              }
              else{
              this.rootPage = UpdatePage;
              }
               loader.dismiss();
              console.log('test');
              });

  // }
  // else{
  // this.rootPage = HomePage;
  // }
  //  loader.dismiss();
  // console.log('test');
  // });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();




    });
  }
}

ionicBootstrap(MyApp);
