import {Component} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {MenuPage} from "../menu/menu";
import {Order, OrderService} from '../../providers/order-service/order-service';
import {OrderConfirmPage} from "../orderconfirm/orderconfirm";
import {Device} from 'ionic-native';
import {HomePage} from "../home/home"
@Component({
	templateUrl: 'build/pages/restaurant/restaurant.html',
	})

export class RestaurantPage {
    posts:any;
    item:any;
    items:any;
    post:any;
    text2:any;
	order:Order = null;
	orders: Order[];
	    total:any;
	        numbercount: any;
          ordertype:any;


	constructor(private http: Http, private navCtrl:NavController, private navparam:NavParams, public orderService: OrderService, public loadingController:LoadingController){

    this.text2=(Device.device.uuid);

        let loader = this.loadingController.create({content:"Loading..."});
        loader.present();

    this.ordertype = navparam.get('ordertype');
    this.post = navparam.get('post');
	this.http.get('https://ldeify.com/categories/?resno='+ encodeURI(this.post.resno)+'&format=json')
	.map(res => res.json())
		.subscribe(data => {
    		this.items = data;
    		    loader.dismiss();
		});

		
	}

  private onPageDidEnter() {
    this.loadOrder();
  }

private loadOrder() {
    this.orders = [];
    var numbercount = 0;
    this.orderService.getOrders().then(
      data => {
        this.orders = [];
        var total = 0

        if (data.res.rows.length > 0) {

              // function insertDecimal(num) {
              //   return (num).toFixed(2);
              // }

              for (var i = 0; i < data.res.rows.length; i++) {
              	// console.log(data.res.rows.item(i).text);
                let item = data.res.rows.item(i);
                let z =  JSON.parse(item.title);                
                let zz = z.itemprice;
                let zzzz = zz*item.text;
                let y = +zzzz;
                let ccount=1*item.text;
                numbercount += ccount;

                total += y;
 
                let xx = z.itemname;
                item.name = xx;
                item.price = zzzz.toFixed(2);
                item.text = Math.round(item.text)
                this.orders.push(new Order(item.title, item.text, item.id, item.name, item.price));
              }

               this.numbercount = numbercount;


              this.total =  total.toFixed(2);
                console.log(this.total);
            }



        else {
        	this.total = 0;
          this.numbercount=0;
        }    

// console.log(JSON.stringify(this.agg));

      }
    );
  }

	
click(event,item) {
        this.navCtrl.push(MenuPage,{
        	item:item,
          ordertype:this.ordertype
        });
		console.log()
		}


confirm(){
         let loader2 = this.loadingController.create({content:"Loading..."});
        loader2.present();

    this.http.get('https://ldeify.com/cuser/?caa=' + encodeURI(this.text2))
  .subscribe(data => {
    this.posts = data['_body'];
    console.log(this.posts)
      if (this.posts == 'OK'){
      loader2.dismiss();
        this.navCtrl.push(OrderConfirmPage,{
          resno:this.item.resno,
          ordertype:this.ordertype
        });
      }
      else{             
      loader2.dismiss();        
        this.navCtrl.push(HomePage,{
                     });
      }



    });

}



ionViewDidEnter() {
    console.log("I'm alive!");
  }



}