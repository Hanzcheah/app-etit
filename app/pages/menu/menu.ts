import {Component, trigger, state, keyframes, animate, transition, style, NgZone} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, NavParams, LoadingController,ToastController} from 'ionic-angular';
import {Order, OrderService} from '../../providers/order-service/order-service';
import {Device} from 'ionic-native';
import {OrderConfirmPage} from "../orderconfirm/orderconfirm";
import {HomePage} from "../home/home"
@Component({
	templateUrl: 'build/pages/menu/menu.html',
    animations: [
    trigger('anima', [
            state('active', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('inactive => active', [
        animate('300ms ease-in', keyframes([
          style({transform: 'translate3d(0,0,0)', offset: 0}),
          style({transform: 'translate3d(0,-10px,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
      ]))
        ])
    
    ])
    ]
	})

export class MenuPage {
    
	orders: Order[];
	order:Order = null;
	test:any;
    item: any;
    posts: any;
    posts2:any;
    total:any;
    reply: any;  
    replytext:any; 
    reply2:any; 
    reply3:any;
    text2:any;
    public animaState: String = 'inactive';
    numbercount: any;
    ordertype:any;
    

	constructor(private http: Http, private navCtrl:NavController, private navParams:NavParams,public toastCtrl: ToastController, public orderService: OrderService, public zone:NgZone, public loadingController:LoadingController){
 
         let loader = this.loadingController.create({content:"Loading..."});
        loader.present();
    this.item = navParams.get('item');
        this.ordertype = navParams.get('ordertype');
    this.text2=(Device.device.uuid);      
    console.log(this.ordertype);
    // this.orderService.getOrders().then((orders) => {
    // this.test = JSON.parse(orders);
    
    // })
 
	this.http.get('https://ldeify.com/menupage/?categoriesno=' + encodeURI(this.item.categoriesno) +'&resno='+ encodeURI(this.item.resno) + '&hidden=false'+ '&format=json')
	.map(res => res.json())
	.subscribe(data => {
    this.posts = data;
        loader.dismiss();
	});


		
}

triggerAnimation() {
    this.animaState = 'active';
    setTimeout(()=>{
      this.animaState ='inactive';
    },1000);   
  }

  // reset() {

  //     this.animaState = "inactive";

  // }

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


              this.total = total.toFixed(2);
                console.log(this.total);
            }



        else {
        	this.total = 0;
          this.numbercount=0;
        }    

// console.log(JSON.stringify(this.agg));
  this.triggerAnimation();

      }
    );
  }
	
  private onPageDidEnter() {
    this.loadOrder();
  }


presentToast(item) {
    let toast = this.toastCtrl.create({
      message: item + ' has been added to your order',
      duration: 900,
      position: 'top',
      cssClass: "ttss",
    });
    toast.present();
  }

public click(event, post)
{

	this.order = new Order('', null , null, '', '');
  this.presentToast(post.itemname);


   this.orderService.getOrders().then(
      data => {
        this.orders = [];
        var total = 0
        var duplicate = 0
        if (data.res.rows.length > 0) {
              for (var i = 0; i < data.res.rows.length; i++) {
                // console.log(data.res.rows.item(i).text);
                let item = data.res.rows.item(i);
                    if(JSON.stringify(post) == item.title)           
                    {
                        console.log('duplicate');
                        duplicate = 1;

                        let zzz= item.text;
                        let xxx = + zzz + +1;

                        // this.order = new Order(JSON.stringify(post), "2" , zzz, '');

                        // this.orders.push(new Order(item.title, item.text, item.id, item.name));
                        this.orderService.removeOrder(item);
                        this.order = new Order(JSON.stringify(post), xxx, null, '','');
                                  this.orderService.saveOrder(this.order).then((data) => {
                                  // Set the automatic created id to our note
                                    this.order.id = data.res["insertId"];
                                  // this.note.text ="test";
                                  // this.note.title = "test2";
                                          this.loadOrder();
                                  this.order = new Order('', null, null, '','');
                                  });

                    }


                    // else{

                    //       this.order = new Order(JSON.stringify(post), post.itemprice, null, '');
                    //       this.orderService.saveOrder(this.order).then((data) => {
                    //       // Set the automatic created id to our note
                    //         this.order.id = data.res["insertId"];
                    //       // this.note.text ="test";
                    //       // this.note.title = "test2";
                    //               this.loadOrder();
                    //       this.order = new Order('', '', null, '');

                    //      });
                    // }


              }


                if (duplicate != 1 ){
                  console.log('saved');
                  var number = 1
                  this.order = new Order(JSON.stringify(post), number , null, '','');
                                  this.orderService.saveOrder(this.order).then((data) => {
                                  // Set the automatic created id to our note
                                    this.order.id = data.res["insertId"];
                                  // this.note.text ="test";
                                  // this.note.title = "test2";
                                          this.loadOrder();
                                  this.order = new Order('', null , null, '','');
                                  });
                 }
                                          this.loadOrder();
                                  this.order = new Order('', null, null, '','');

        }
            else{
                var number = 1
                this.order = new Order(JSON.stringify(post), number , null, '','');
                this.orderService.saveOrder(this.order).then((data) => {
                  // Set the automatic created id to our note
                    this.order.id = data.res["insertId"];
                  // this.note.text ="test";
                  // this.note.title = "test2";
                          this.loadOrder();
        this.order = new Order('', null, null, '','');

                });

            }
      });






}

  public removeOrder(order: Order) {
    if(order.text > 1){
    let tiid = order.id;
    let tiid1 = order.title;
    order.text = +order.text - +1;



    this.orderService.updateOrder(order);
        this.loadOrder();

    // let index = this.orders.indexOf(order);
 

//     if (index > -1) {
//       this.orders.splice(index, 1);
//     }
//       let ttt = order.text;
//       let title = order.title
//       let ttttt = +ttt - +1;

// this.order = new Order(title, ttttt, null, '','');
//                                   this.orderService.saveOrder(this.order).then((data) => {
//                                   // Set the automatic created id to our note
//                                     this.order.id = data.res["insertId"];
//                                   // this.note.text ="test";
//                                   // this.note.title = "test2";
//                                           this.loadOrder();
//                                   this.order = new Order('', null, null, '','');
//                                   });


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

  var data = JSON.stringify({
        "orderno": "11030",
        "orderdate": "2016-01-01",
        "orderamount": this.total,
        "customerno": this.text2,
        "resno":this.item.resno,
        "text": "11030" + this.text2,
        })
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('http://128.199.188.241/orderin/', data, options)
        .subscribe(data => {
            this.reply = data['_body'];
            this.replytext = data.status;
            console.log(this.reply);
        if (this.replytext == "200"){
           console.log('go');
           this.orderService.getOrders().then(
           data => {
           this.orders = [];
           var total = 0
           if (data.res.rows.length > 0) {
              for (var i = 0; i < data.res.rows.length; i++) {
                // console.log(data.res.rows.item(i).text);
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
                    "resno":this.item.resno,
                    })
                console.log(data2);

                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                this.http.post('http://128.199.188.241/orderitem/', data2, options).subscribe(data => {
                this.reply2 = data});


              }
        }
      });

}
var data3 = JSON.stringify({
                    "orderno": this.reply,
                    "resno":this.item.resno,
                    })
   let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                this.http.post('http://128.199.188.241/orderend/', data3, options).subscribe(data => {
                this.reply3= data});
   this.loadOrder();


  });



// this.orderService.getOrders().then(
//       data => {
//         this.orders = [];
//         var total = 0
//         if (data.res.rows.length > 0) {
//               for (var i = 0; i < data.res.rows.length; i++) {
//                 // console.log(data.res.rows.item(i).text);
//                 let item = data.res.rows.item(i);
//                 let x = data.res.rows.item(i).text;
//                 let y = +(data.res.rows.item(i).text);
//                 total += y;
//                 let z =  JSON.parse(item.title); 
//                 let xx = z.itemname;
//                 item.name = xx;
//                 this.orders.push(new Order(item.title, item.text, item.id, item.name));
//               }


}


abababa(){
         let loader2 = this.loadingController.create({content:"Loading..."});
        loader2.present();

    this.http.get('https://ldeify.com/cuser/?caa=' + encodeURI(this.text2))
  .subscribe(data => {
    this.posts2 = data['_body'];
    console.log(this.posts2)
      if (this.posts2 == 'OK'){
      loader2.dismiss()
        this.navCtrl.push(OrderConfirmPage,{
          resno:this.item.resno,
          ordertype:this.ordertype
        });
      }
      else{     
            loader2.dismiss()                
        this.navCtrl.push(HomePage,{
                     });
      }



    });





}



ionViewDidEnter() {
    console.log("I'm alive!");
  }

}