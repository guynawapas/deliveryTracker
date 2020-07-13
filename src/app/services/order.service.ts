import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import{ map } from 'rxjs/operators';

export interface Order{
  orderId:string;
  items:string;
  lat:number;
  long:number;
  date:string;
  time:number;

}


@Injectable({
  providedIn: 'root'
})

export class OrderService {
 
  private orderCollection:AngularFirestoreCollection<Order>;
  private orders: Observable<Order[]>;
  constructor(db: AngularFirestore) { 
    this.orderCollection = db.collection<Order>('orders');

    this.orders = this.orderCollection.snapshotChanges().pipe(
      map(actions =>{
      return actions.map(a=>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id,...data};
      });
    })
    );

  }

  getOrders(){
    return this.orders;
  }

  getOrder(id){
    return this.orderCollection.doc<Order>(id).valueChanges();
  }

  updateOrder(order:Order,id:string){
    return this.orderCollection.doc(id).update(order);
  }

  addOrder(order:Order){
    return this.orderCollection.add(order);
  }

  removeOrder(id){
    return this.orderCollection.doc(id).delete();
  }

}
