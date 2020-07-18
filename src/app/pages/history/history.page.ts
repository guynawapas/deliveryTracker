import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { OrderWithDict, OrderWithDictService } from 'src/app/services/order-with-dict.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


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
  driverCollections: AngularFirestoreCollection<any>;

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
        //do some filter stuff
        this.filteredOrders=this.filterHistory();
        console.log('._.',this.filteredOrders);
        this.orders = this.filteredOrders;
        console.log('history', this.orders);

      }
     

    });

  }
  filterHistory() {
    this.filteredOrders=this.orders;
    for (let key of Object.keys(this.filters)) {
      //console.log('filtering:',key);
      if (this.filters[key] == 'any'){continue;} 
      else if (key == 'items') {
        let temp = [];
        for(let Od of this.orders){
          for(let keyOrder of Object.keys(Od.items)){
           // console.log('key in loop',keyOrder,this.filters[key],keyOrder==this.filters[key]);
            if(keyOrder==this.filters[key]){
              temp.push(Od);
              break;
            }
          }
        }
        //console.log('temp',temp);
        this.filteredOrders=temp;
        //console.log('filtered',this.filteredOrders);
        
      } else if (key == "driver") {
        this.db.collection('Driver').doc(key).valueChanges().subscribe(
          val=>console.log('drive',val)
        );
      } else {
        this.filteredOrders = this.filteredOrders.filter(
          order => order[key] == this.filters[key]
        );
        //console.log('after filtered',key,this.filteredOrders);

      }

    }
    return this.filteredOrders;
  }



}
