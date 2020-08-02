import {Component, trigger, state, keyframes, animate, transition, style, NgZone} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, NavParams, LoadingController,ToastController,AlertController,App} from 'ionic-angular';
import {Device} from 'ionic-native';
import {OrderTypePage} from "../ordertype/ordertype";
import {PickPage} from "../pick/pick";

@Component({
	templateUrl: 'build/pages/unabletofind/unabletofind.html',
	})

export class unabletofindPage {
    


 orderrefno:any;
 cc:any;
location:any;
posts:any;
lat:any;
lng:any;
place:any;
ordertype:any;

	constructor(public alertCtrl: AlertController, private http: Http, private navCtrl:NavController,  private navParams:NavParams, public loadingController:LoadingController){
        this.ordertype=navParams.get('ordertype');

	}


  showPrompt(var1, var2, var3) {
    let prompt = this.alertCtrl.create({

      message: "Are you at " + var3+ " ?",

      buttons: [
        {
          text: 'Retry',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Correct',
          handler: data => {
            console.log('Saved clicked');
        this.navCtrl.push(PickPage,{
        	ordertype:this.ordertype,
            lat:var1,
            lng:var2
        });
          }
        }
      ]
    });
    prompt.present();
  }


buy(){
	console.log("buttonpressed");
	let location1 = this.location;
	console.log(this.location);
	this.http.get('https://maps.google.com/maps/api/geocode/json?key=AIzaSyALTo9xC0mWqSTLDvBHcpC6Tf00ARnI3Sc&address=' + this.location)
	.map(res => res.json())
	.subscribe(data => {
    this.posts = data;
    this.lat = this.posts.results[0].geometry.location.lat;
    console.log(this.lat);
    this.lng = this.posts.results[0].geometry.location.lng;
    this.place= this.posts.results[0].formatted_address


   this.showPrompt(this.lat, this.lng, this.place);






	});











}





}