import { Component ,OnInit,} from '@angular/core';
import { Order, OrderService } from '../services/order.service';
import { OrderWithDictService, OrderWithDict } from '../services/order-with-dict.service';
import { DataService } from '../services/data.service';
declare var google:any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  orders:OrderWithDict[];
 
  constructor(private orderWithDictService:OrderWithDictService,
    private dataService:DataService) {}
  ngOnInit(){
   this.data();
   
  }
  data(){
    this.orderWithDictService.getOrders().subscribe(res => {
      this.orders = res;
      this.dataService.setData(1,this.orders);
    
    });
  }
}
