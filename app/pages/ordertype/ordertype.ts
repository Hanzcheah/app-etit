import {Component} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {PickPage} from "../pick/pick";
import {ppPage} from "../pp/pp";
import {Geolocation} from 'ionic-native';
import {Device} from 'ionic-native';
import {unabletofindPage}from "../unabletofind/unabletofind";

@Component({
	templateUrl: 'build/pages/ordertype/ordertype.html',
	})

export class OrderTypePage {
    
    items:any;
    posts:any;
    location1:any;
    location2:any;    
    uuid:any;

    

	constructor(private http: Http, private navCtrl:NavController, private navparam:NavParams, public loadingController:LoadingController){
        this.uuid = Device.device.uuid;
        console.log(this.uuid); 
                 let loader = this.loadingController.create({content:"Finding restaurants near you..."});
        loader.present();
          setTimeout(() => {
    loader.dismiss();
  }, 5000);
    let options = {timeout: 5000,};
    Geolocation.getCurrentPosition(options).then((resp)=>{
        this.location1 = resp.coords.latitude;
        this.location2 = resp.coords.longitude;
        console.log(this.location1);
        console.log(this.location2);


    }).catch((error)=>{
        console.log(error);
    });

        this.http.get('https://ldeify.com/dorders/?cust=' + encodeURI(this.uuid) +'&qop=31')
    .map(res => res.json())
    .subscribe(data => {
    this.posts = data;
    console.log(this.posts);

    });
		
	}
	
click(event,ordertype) {



    if(this.location1 == null){


    console.log("Geolocation error");
                // loader.dismiss();
        this.navCtrl.setRoot(unabletofindPage,{
        ordertype:ordertype
        });
}else{



console.log(ordertype);
        this.navCtrl.push(PickPage,{
        	ordertype:ordertype,
            lat:this.location1,
            lng:this.location2
        });
		
}
        }



click2(event,ordertype) {

        this.navCtrl.push(ppPage);
        }


}