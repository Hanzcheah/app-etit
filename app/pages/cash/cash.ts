import {Component, trigger, state, keyframes, animate, transition, style, NgZone} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, NavParams, LoadingController,ToastController,AlertController,App} from 'ionic-angular';
import {Device} from 'ionic-native';
import {OrderTypePage} from "../ordertype/ordertype";


@Component({
	templateUrl: 'build/pages/cash/cash.html',
	})

export class  CashPage {
    


 orderrefno:any;
 cc:any;


	constructor(private http: Http, private navCtrl:NavController,  private navParams:NavParams, public loadingController:LoadingController){


        
        this.orderrefno = navParams.get('orderrefno');
        this.cc = navParams.get('cc');

	}





buy()
{

                     this.navCtrl.setRoot(OrderTypePage);


}





}