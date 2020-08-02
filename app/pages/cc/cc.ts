import {Component, NgZone} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {MenuPage} from "../menu/menu";
import {CashPage} from "../cash/cash";
import {Device} from 'ionic-native';
import {Order, OrderService} from '../../providers/order-service/order-service';
import {notconnectPage} from "../notconnect/notconnect";

var Stripe;


@Component({
	templateUrl: 'build/pages/cc/cc.html',
	})

export class CcPage {
    
    items:any;
    post:any;
	order:Order = null;
	orders: Order[];
	    total:any;
	        numbercount: any;
          ordertype:any;
cvc:any;
cardCvc: any;
expiryMonth:any;
expiryYear:any;
cardNumber: any;
card:any;
form:any;
token:any;
text2:any;
success:any;
orderrefno:any;
    reply: any;  
    replytext:any; 
    reply2:any; 
    reply3:any;
    reply3text:any;
    comments:any;
    success2:any;
    status:any;
    statusinfo:any;
tabnum:any;

    resno:any;

	constructor(private http: Http, private _zone: NgZone, private navCtrl:NavController, private navparam:NavParams, public orderService: OrderService, public loadingController:LoadingController){
this.card=[];
this.card.cvc="";
        this.tabnum = navparam.get('tabnum');
        this.ordertype=navparam.get('ordertype');


this.card.expiryMonth="";
this.card.expiryYear="";
this.card.cardNumber="";
    this.text2=(Device.device.uuid);

        this.resno = navparam.get('resno');
        this.comments = navparam.get('comments')

		
	}
private loadOrder() {

    this.orders = [];
    var numbercount = 0;
    this.orderService.getOrders().then(
      data => {
        this.orders = [];
        var total = 0

        if (data.res.rows.length > 0) {



              for (var i = 0; i < data.res.rows.length; i++) {

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


              this.total = total.toFixed(2);
                console.log(this.total);
            }



        else {
          this.total = 0;
          this.numbercount=0;
                              // loader.dismiss();
        }    

// console.log(JSON.stringify(this.agg));

      }
    );
  }
  
  private onPageDidEnter() {
    this.loadOrder();

  }
	
click2(){
   this.http.get('https://ldeify.com/1335115/?resno=' + encodeURI(this.resno))
  .subscribe(data => {
    this.status = data['_body'];
        
  if(this.status=="True"){


        let loader = this.loadingController.create({content:"Loading..."});
        loader.present();

    (<any>window).Stripe.card.createToken({
      number: this.card.cardNumber,
      exp_month: this.card.expiryMonth,
      exp_year: this.card.expiryYear,
      cvc: this.card.cvc
    }, (status: number, response: any) => {this._zone.run(() => {

      // Wrapping inside the Angular zone

        if (status === 200) {
          loader.dismiss();
          console.log(`Success! Card token ${response.card.id}.`);
this.stripeResponseHandler(status, response);
  
          
        } else {
          loader.dismiss();
          console.log(response.error.message);
        }
 });
    
    });

}else{
   this.statusinfo = "Restaurant terminal is not connected"
this.navCtrl.push(notconnectPage,{

                     });

}
});

  }


stripeResponseHandler(status, response) {



        let loader = this.loadingController.create({content:"Loading..."});
loader.present();
  if (response.error) { // Problem!
console.log('error');
  } else { 

  var total2 = this.total.replace('.', '')
  console.log(total2)
  var data3 = JSON.stringify({
                                  "stripeToken": response.id,
                                  "customerno": this.text2,
                                  "amt":Number(total2),

                                  })
  console.log(data3);
                 let headers = new Headers({ 'Content-Type': 'application/json' });
                              let options = new RequestOptions({ headers: headers });
                              this.http.post('https://ldeify.com/dpay/', data3, options).subscribe(data => {


    this.success=data['_body'];

    if(this.success == "OK"){

  var data1 = JSON.stringify({
        "orderno": this.tabnum,
        "orderdate": "2016-01-01",
        "orderamount": this.total,
        "customerno": this.text2,
        "resno":this.resno,
        "ordertype":this.ordertype,
        "text": this.tabnum + this.text2,
        "comments": this.comments
        })
  console.log(data1);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('https://ldeify.com/orderin/', data1, options)
        .subscribe(data => {
            this.reply = data['_body'];
            this.replytext = data.status;

        if (this.replytext == "200"){

           this.orderService.getOrders().then(
           data => {
           this.orders = [];
           var total = 0
                     if (data.res.rows.length > 0) {
                              for (var i = 0; i < data.res.rows.length; i++) {

                                let item = data.res.rows.item(i);
                                let x = item.text;
                                let z =  JSON.parse(item.title); 
                                let xx = z.itemno;
                                console.log(item.id); 
                                var data2 = JSON.stringify({
                                    "orderno": this.reply,
                                    "quantity": x,
                                    "itemno": z.itemno,
                                    "customerno": this.text2,
                                    "resno":this.resno,
                                    })
                                // console.log(data2);

                                let headers = new Headers({ 'Content-Type': 'application/json' });
                                let options = new RequestOptions({ headers: headers });
                                this.http.post('https://ldeify.com/orderitem/', data2, options).subscribe(data => {
                                this.reply2 = data});


                              }
                  }
                  var data3 = JSON.stringify({
                                  "orderno": this.reply,
                                  "resno":this.resno,
                                  })
                 let headers = new Headers({ 'Content-Type': 'application/json' });
                              let options = new RequestOptions({ headers: headers });
                              this.http.post('https://ldeify.com/orderend/', data3, options).subscribe(data => {
                              this.reply3= data;
                          this.reply3text = data.status;
                          this.orderrefno=data['_body'];

              console.log(this.reply3);
                      if (this.reply3text == "200"){
                    loader.dismiss();
                                         this.navCtrl.setRoot(CashPage,{
                      orderrefno:this.orderrefno,
                      
                     });
                }else{
                  console.log("error pages")
                }



                          });
                    });
          }
  });

loader.dismiss();








    }
    else{
loader.dismiss();
    this.success2 = this.success
    }

  });

}
}




ionViewDidEnter() {
    console.log("I'm alive!");
  }



}