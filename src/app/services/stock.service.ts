import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderWithDict } from './order-with-dict.service';

export interface Stock{
  items:{[key:string]:number};
 
}
@Injectable({
  providedIn: 'root'
})
export class StockService {
private stockCollection:AngularFirestoreCollection<Stock>;
private stocks: Observable<Stock[]>;
private stock:Stock;
  constructor(db : AngularFirestore) {
    this.stockCollection = db.collection<Stock>('stocks');
    this.stocks = this.stockCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      })
    );
   }

   getStocks(){
     return this.stocks;
   }

   getStock(id){
     return this.stockCollection.doc<Stock>(id).valueChanges();
   }
   updateStock(stock:Stock,id:string){
     return this.stockCollection.doc(id).update(stock);
   }
   addStock(stock:Stock){
     return this.stockCollection.add(stock);
   }
   deductFromStock(order:OrderWithDict){
     
    this.getStock("IVpCJOqDuQJTciOpXji1").subscribe(res=>{
      this.stock=res;
    });
    //need delay cuz stock need time to set apparently
    setTimeout(()=>{
      let tempStock=this.stock;
      for(let keyOrder of Object.keys(order.items)){
        let remainingStock = this.stock.items[keyOrder]-order.items[keyOrder];
        console.log('deducting: ',keyOrder);
       
          if(this.stock.items[keyOrder]<=0||remainingStock<0){//out of stock
            console.log(keyOrder,'is out of stock!, or not enough stock!');
            this.stock=tempStock;
            break;
          }else{
            this.stock.items[keyOrder]=remainingStock;
          }
     }
     console.log('end of for loop');
     this.updateStock(this.stock,"IVpCJOqDuQJTciOpXji1");
    },500);
   }

   
}
