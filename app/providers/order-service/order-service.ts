import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage, SqlStorage} from 'ionic-angular';





export class Order {
  title: string;
  text: number;
  id: number;
  name:string;
  price: string;

  constructor(title: string, text: number, id: number, name: string, price:string) {
    this.title = title;
    this.text = text;
    this.id = id;
    this.name = name;
    this.price = price;

  }
}



@Injectable()
export class OrderService {
  storage: Storage = null;
 
  // Init an empty DB if it does not exist by now!
  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS tables (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, text TEXT)');
  }
 
  // Get all notes of our DB
  public getOrders() {
    return this.storage.query('SELECT * FROM tables');
  }
 
  // Save a new note to the DB
  public saveOrder(order: Order) {
    let sql = 'INSERT INTO tables (title, text) VALUES (?,?)';
    return this.storage.query(sql, [order.title, order.text]);
  }
 
  // Update an existing note with a given ID
  public updateOrder(order) {
    let sql = 'UPDATE tables SET title = ?, text = ? WHERE id = ?';
    return this.storage.query(sql, [order.title, order.text, order.id]);
  }
 
  // Remoe a not with a given ID
  public removeOrder(order: Order) {
    let sql = 'DELETE FROM tables WHERE id = \"' + order.id + '\"';
    this.storage.query(sql);
  }

  public delOrder(){
    let sql = 'DELETE FROM tables WHERE id > 0';
    this.storage.query(sql);


  }


}