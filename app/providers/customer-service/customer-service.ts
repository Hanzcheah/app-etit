import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
 
export class User {
  name: string;
  pid: string;
  id: number;


  constructor(name: string, pid: string, id: number) {
    this.name = name;
    this.pid = pid;
    this.id = id;
  }
}


 
@Injectable()
export class CustomerService {
  storage: Storage = null;
 
  // Init an empty DB if it does not exist by now!
  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS table2 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, pid TEXT)');
  }
 
  // Get all notes of our DB
  public getUser() {
    return this.storage.query('SELECT * FROM table2');
  }
 
  // Save a new note to the DB
  public saveUser(user: User) {
    let sql = 'INSERT INTO table2 (name, pid) VALUES (?,?)';
    return this.storage.query(sql, [user.name, user.pid]);
  }
 
  // Update an existing note with a given ID
  public updateUser(user: User) {
    let sql = 'UPDATE user SET title = \"' + user.name + '\", text = \"' + user.pid + '\",  WHERE id = \"' + user.id + '\"';
    this.storage.query(sql);
  }
 
  // Remoe a not with a given ID
  public removeUser(user: User) {
    let sql = 'DELETE FROM table2 WHERE id = \"' + user.id + '\"';
    this.storage.query(sql);
  }

}