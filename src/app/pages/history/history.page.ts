import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { OrderWithDict, OrderWithDictService } from 'src/app/services/order-with-dict.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  orders: OrderWithDict[];
  filteredOrders: OrderWithDict[];
  doFilter: boolean;
  filters: {};
 
  constructor(private route: ActivatedRoute,
    private router: Router,
    private orderWithDictService: OrderWithDictService,
    private db: AngularFirestore,
    private dataService: DataService) { }

  ngOnInit() {
    
    if (this.route.snapshot.data['special']) {
      this.filters = this.route.snapshot.data['special'];
      this.doFilter = true;
      console.log('special!',this.filters);
    }
    this.orderWithDictService.getOrders().subscribe(res => {

      this.orders = res;
      if (this.doFilter) {
        console.log('did filter');

       
        
        
        this.filteredOrders=this.filterHistory();
      
        this.orders = this.filteredOrders;
        console.log('history', this.orders);

      }

    });

  }
  

  filterHistory() {
    
    this.filteredOrders=this.orders;
    for (let key of Object.keys(this.filters)) {
      //console.log('key',key);
      if (this.filters[key] == 'any'){
       // console.log('continued',key);
        continue;} 
      else if (key == 'items') {
        let temp = [];
        for(let Od of this.filteredOrders){
          for(let keyOrder of Object.keys(Od.items)){
            if(keyOrder==this.filters[key]){
              temp.push(Od);
              break;
            }
          }
        }
       // console.log('items finish',this.filteredOrders);
        this.filteredOrders=temp;
      } else if (key == "driver") {
        this.db.collection('Driver').doc(key).valueChanges().subscribe(
          val=>console.log('drive',val)
        );
      }else if(key=='date'){
        //console.log('at date b4 filter',this.filteredOrders);
        this.filteredOrders = this.filteredOrders.filter(
          order => order[key].substring(5,10) == this.filters[key]
        );
        //console.log('at date after filter',this.filteredOrders);
      } else {
        let temp2=[];
        for(let Od of this.filteredOrders){
          if(Od[key]==this.filters[key]){
            temp2.push(Od);
          }
        }
        this.filteredOrders=temp2;
        //console.log('after else',this.filteredOrders);
      }
    }
    return this.filteredOrders;
  }



}
