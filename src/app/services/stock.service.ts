import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Stock{
  itemList:Array<string>;
  item1:number;
  item2:number;
  item3:number;
 
}
@Injectable({
  providedIn: 'root'
})
export class StockService {
private stockCollection:AngularFirestoreCollection<Stock>;
private stocks: Observable<Stock[]>;
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


   
}
