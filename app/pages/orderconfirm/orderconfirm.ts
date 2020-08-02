import {Component, trigger, state, keyframes, animate, transition, style, NgZone} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, NavParams, LoadingController,ToastController,AlertController,App, Keyboard} from 'ionic-angular';
import {Order, OrderService} from '../../providers/order-service/order-service';
import {Device} from 'ionic-native';
import {OrderTypePage} from "../ordertype/ordertype";
import {CashPage} from "../cash/cash";
import {CcPage} from"../cc/cc";
import {HomePage} from "../home/home"
import {notconnectPage} from "../notconnect/notconnect";

@Component({
	templateUrl: 'build/pages/orderconfirm/orderconfirm.html',
	})

export class OrderConfirmPage {
    
	orders: Order[];
	order:Order = null;
	test:any;
    item: any;
    posts: any;
    total:any;
    reply: any;  
    replytext:any; 
    reply2:any; 
    reply3:any;
    reply3text:any;
    orderrefno:any;
    text2:any;
    public animaState: String = 'inactive';
    numbercount: any;
    resno:any;
    ordertype:any;
    add:any;
    tabnum:any;
    status:any;
    statusinfo:any;
    valueforngif:any;
    valuengif:any;



	constructor(private http: Http, private navCtrl:NavController, public app: App, public keyboard:Keyboard, public alertCtrl: AlertController,private navParams:NavParams,public toastCtrl: ToastController, public orderService: OrderService, public zone:NgZone, public loadingController:LoadingController){


        // let loader = this.loadingController.create({content:"Loading..."});
        // loader.present();
    this.text2=(Device.device.uuid);

        this.resno = navParams.get('resno');
        this.ordertype=navParams.get('ordertype');
        if(this.ordertype=="Dinein"){
          this.statusinfo= "yes";
        console.log("yes");
        }
		    console.log(this.ordertype);
        // loader.dismiss();
	}


presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Please Enter Table Number',
    subTitle: 'Error',
    buttons: ['Try Again']
  });
  alert.present();
} 

private loadOrder() {
        //   let loader = this.loadingController.create({content:"Loading..."});
        // loader.present();
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


              this.total = total.toFixed(2);
                console.log(this.total);
                    // loader.dismiss();
            }



        else {
        	this.total = 0;
          this.numbercount=0;
          this.navCtrl.pop();
                              // loader.dismiss();
        }    

// console.log(JSON.stringify(this.agg));

      }
    );
  }
	
  private onPageDidEnter() {
    this.loadOrder();

  }


public removeOrder(order: Order) {
    if(order.text > 1){
    let tiid = order.id;
    let tiid1 = order.title;
    order.text = +order.text - +1;



    this.orderService.updateOrder(order);
        this.loadOrder();

    }else{


    this.orderService.removeOrder(order);
    let index = this.orders.indexOf(order);
 
    if (index > -1) {
      this.orders.splice(index, 1);
    }
    this.loadOrder();
    }
  }


buy()
{
        //   let loader = this.loadingController.create({content:"Loading..."});
        // loader.present();

        let comments = this.add;

   
        let tabnum = this.tabnum

if(this.ordertype=="Dinein"){
           if(!tabnum){
            this.presentAlert();
           }
//         if(this.ordertype=="Dinein"){


//   this.http.get('https://ldeify.com/1335115/?resno=' + encodeURI(this.resno))
//   .subscribe(data => {
//     this.status = data['_body'];
        
//   if(this.status=="True"){




//   var data4 = JSON.stringify({
//         "orderno": "11030",
//         "orderdate": "2016-01-01",
//         "orderamount": this.total,
//         "customerno": this.text2,
//         "resno":this.resno,
//         "ordertype":this.ordertype,
//         "text": "11030" + this.text2,
//         "comments": comments  
//         })
//         let headers = new Headers({ 'Content-Type': 'application/json' });
//         let options = new RequestOptions({ headers: headers });
//         this.http.post('https://ldeify.com/orderin/', data4, options)
//         .subscribe(data => {
//             this.reply = data['_body'];
//             this.replytext = data.status;
//             // console.log(this.reply);
//         if (this.replytext == "200"){
//            // console.log('go');
//            this.orderService.getOrders().then(
//            data => {
//            this.orders = [];
//            var total = 0
//                      if (data.res.rows.length > 0) {
//                               for (var i = 0; i < data.res.rows.length; i++) {
//                                 // console.log(data.res.rows.item(i).text);
//                                 let item = data.res.rows.item(i);
//                                 let x = item.text;
//                                 let z =  JSON.parse(item.title); 
//                                 let xx = z.itemno;
//                                 console.log(item.id); 
//                                 var data2 = JSON.stringify({
//                                     "orderno": this.reply,
//                                     "quantity": x,
//                                     "itemno": z.itemno,
//                                     "customerno": this.text2,
//                                     "resno":this.resno,
//                                     })
//                                 // console.log(data2);

//                                 let headers = new Headers({ 'Content-Type': 'application/json' });
//                                 let options = new RequestOptions({ headers: headers });
//                                 this.http.post('https://ldeify.com/orderitem/', data2, options).subscribe(data => {
//                                 this.reply2 = data});


//                               }
//                   }
//                   var data3 = JSON.stringify({
//                                   "orderno": this.reply,
//                                   "resno":this.resno,
//                                   })
//                  let headers = new Headers({ 'Content-Type': 'application/json' });
//                               let options = new RequestOptions({ headers: headers });
//                               this.http.post('https://ldeify.com/orderend/', data3, options).subscribe(data => {
//                               this.reply3= data;
//                           this.reply3text = data.status;
//                           this.orderrefno=data['_body'];

//               console.log(this.reply3);
//                       if (this.reply3text == "200"){
//                     loader.dismiss();
//                 }
//                           });
//                     });
//           }
//   });


//                      this.navCtrl.setRoot(CashPage,{
//                       orderrefno:this.orderrefno,
//                       cc:"bb"
//                      });

//                      // else if(this.ordertype=="Takeaway"){
//                      // console.log(this.ordertype);
//                      // this.navCtrl.setRoot(CcPage,{
//                      //  orderrefno:this.orderrefno
//                      // });
//                      // }

// }else{
//     loader.dismiss();
//                      this.navCtrl.push(notconnectPage,{

//                      });

// }
//                        });




//                      }
                     // else if(this.ordertype=="Takeaway"){
else{
this.navCtrl.push(CcPage,{

  resno:this.resno,
  ordertype:this.ordertype,
  comments:comments,
  tabnum:tabnum
});
console.log(comments);
// loader.dismiss();

                     }
                   }
                   else if(this.ordertype=="Takeaway"){
                    this.navCtrl.push(CcPage,{
                        ordertype:this.ordertype,
tabnum:"11030",
  resno:this.resno,
  comments:comments,

});
console.log(comments);
// loader.dismiss();

                   }

}



public keyboardCheck() {
        return this.keyboard.isOpen();

}
//  ionViewDidEnter(){
//     this.keyboard.isOpen().subscribe(data=>{
//       this.valuengif=data;
//       if(this.valuengif=true){
//         this.valueforngif="yes";
//       }
//     })

// }


}