import {Component} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, NavParams,Platform, LoadingController} from 'ionic-angular';
import {RestaurantPage} from "../restaurant/restaurant";
import {unabletofindPage}from "../unabletofind/unabletofind";
import {Order, OrderService} from '../../providers/order-service/order-service';
// import {CustomerService, User} from '../../providers/customer-service/customer-service';
import {HomePage} from "../home/home";
import {Geolocation} from 'ionic-native';
@Component({
	templateUrl: 'build/pages/pick/pick.html',
		// providers: [CustomerService]
	})

export class PickPage {
    
    posts:any;
    users:any;
    location1:any;
    location2:any;
    ordertype:any;
    lat:any;
    lng:any;



	constructor(private http: Http, private navCtrl:NavController, public orderService:OrderService,private navParams:NavParams,  public platform:Platform, public loadingController:LoadingController){


    let loader = this.loadingController.create({content:"Loading..."});
        loader.present();
    this.ordertype = navParams.get('ordertype');   
        this.lat = navParams.get('lat');  
            this.lng = navParams.get('lng');  
    this.platform = platform;
    console.log(this.ordertype);
if (this.ordertype == "Dinein"){
    // if(this.lat == null){


    // console.log("Geolocation error");
    //             // loader.dismiss();
    //     this.navCtrl.setRoot(unabletofindPage);

    // Geolocation.getCurrentPosition().then((resp)=>{
    //     this.location1 = resp.coords.latitude;
    //     this.location2 = resp.coords.longitude;
    //     console.log(this.location1);
    //     console.log(this.location2);
    //         this.http.get('https://ldeify.com/dt2r/?lat='+this.location1+'&lng='+this.location2+'&dis=1&format=json')
    // .map(res => res.json())
    // .subscribe(data => {
    // this.posts = data;
    // console.log("redo");
    // loader.dismiss();
    // });


    // }).catch((error)=>{
    //     console.log(error);
    // });



// }

// else{
this.http.get('https://ldeify.com/dt2r/?lat='+this.lat+'&lng='+this.lng+'&dis=2&format=json')
    .map(res => res.json())
    .subscribe(data => {
    this.posts = data;
    console.log("bringforward");
    loader.dismiss();
    });

// }


}
else if(this.ordertype == "Takeaway"){
    // if(this.lat == null){
    //         // loader.dismiss();
    // this.navCtrl.setRoot(unabletofindPage);

    // Geolocation.getCurrentPosition().then((resp)=>{
    //     this.location1 = resp.coords.latitude;
    //     this.location2 = resp.coords.longitude;
    //     console.log(this.location1);
    //     console.log(this.location2);
    //         this.http.get('https://ldeify.com/dt2r/?lat='+this.location1+'&lng='+this.location2+'&dis=20&format=json')
    // .map(res => res.json())
    // .subscribe(data => {
    // this.posts = data;
    // console.log("redo");
    // loader.dismiss();
    // });


    // }).catch((error)=>{
    //     console.log(error);
    // });


// }

// else{
this.http.get('https://ldeify.com/dt2r/?lat='+this.lat+'&lng='+this.lng+'&dis=20&format=json')
    .map(res => res.json())
    .subscribe(data => {
    this.posts = data;
    console.log("bringforward");
    loader.dismiss();
    });

// }
}


    // let watch = Geolocation.watchPosition();
    // watch.subscribe((data)=>{

    // });

//     this.http.get('http://128.199.188.241/dt2r/?lat='+this.location1+'&lng='+this.location2+'&format=json')
// 	.map(res => res.json())
  
// 	.subscribe(data => {
    
//     this.posts = data;
//     console.log(this.posts);
//     loader.dismiss();
// 	});
 //        this.platform.ready().then(() => {
 //      this.platform.registerBackButtonAction(() => {
 //        this.platform.exitApp(); 
 //        window.close(); 
 //      });
 // });

		
	}
		
click(event,post) {
        this.navCtrl.push(RestaurantPage,{
        post: post,
        ordertype: this.ordertype,
        });

	}

public ionViewDidEnter() {
    this.orderService.delOrder();
console.log('deleted')
  }






}