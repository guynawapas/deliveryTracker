import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StockService } from './stock.service';

export interface OrderWithDict{
  items:{[key:string]:number};
  orderId:string;
  lat:number;
  long:number;
  date:string;
  time:number;
  delivered:boolean;
  dropbox:string;
}


@Injectable({
  providedIn: 'root'
})
export class OrderWithDictService {
  private orderWithDictCollection:AngularFirestoreCollection<OrderWithDict>;
  private orders: Observable<OrderWithDict[]>;
  
  

  


  constructor(db: AngularFirestore) {
    this.orderWithDictCollection = db.collection<OrderWithDict>('ordersWithDict');

    this.orders = this.orderWithDictCollection.snapshotChanges().pipe(
      map(actions =>{
      return actions.map(a=>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id,...data};
      });
    })
    );//end of this.orders chain thingy
   
  
   }


  getOrders(){
    return this.orders;
  }
  getOrder(id){
    return this.orderWithDictCollection.doc<OrderWithDict>(id).valueChanges();
  }

  updateOrder(order:OrderWithDict,id:string){
    return this.orderWithDictCollection.doc(id).update(order);
  }

  addOrder(order:OrderWithDict){
    
    return this.orderWithDictCollection.add(order);
  }

  removeOrder(id){
    return this.orderWithDictCollection.doc(id).delete();
  }


  

}
