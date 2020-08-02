import {Component, trigger, state, keyframes, animate, transition, style, NgZone} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, NavParams, LoadingController,Platform,ToastController,AlertController,App} from 'ionic-angular';
import {Device} from 'ionic-native';
import {OrderTypePage} from "../ordertype/ordertype";


@Component({
	templateUrl: 'build/pages/updatepage/updatepage.html',
	})

export class UpdatePage {
    

link:any;




	constructor(private http: Http, private navCtrl:NavController, public plt: Platform, private navParams:NavParams, public loadingController:LoadingController){
if (this.plt.is('ios')) {
console.log('ios');
this.http.get('https://ldeify.com/updateboolean/?v=0.8.0&p=ios')
              .subscribe(data => {
                this.link = data['_body'];
                  
              });


	}else if(this.plt.is('android')) { 
	console.log('android');
	this.http.get('https://ldeify.com/updateboolean/?v=0.8.0&p=and')
              .subscribe(data => {
                this.link = data['_body'];
                  
              });
	}

}






}