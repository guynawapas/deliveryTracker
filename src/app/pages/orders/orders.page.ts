import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from 'src/app/services/order.service';
import { NavController } from '@ionic/angular';
import { isNgTemplate } from '@angular/compiler';
import { OrderWithDict, OrderWithDictService } from 'src/app/services/order-with-dict.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders:OrderWithDict[];
  nearOrders:OrderWithDict[]=[];
  constructor(private orderWithDictService: OrderWithDictService, private nav:NavController) { }

  ngOnInit() {
    this.orderWithDictService.getOrders().subscribe(res =>{
       this.orders=res;
       console.log(this.orders);
       //filter called here cus it broke when call outside...
      //this.filterOrders();
       //console.log(this.nearOrders);

    });
    
  }
  //filter Order that is near us (0,0)
  filterOrders(){
    for(let i=0;i<this.orders.length;i++){
      if(this.orders[i].lat<5&&this.orders[i].long<5){
        this.nearOrders.push(this.orders[i]);
      }
    }
  }

  remove(item){
    this.orderWithDictService.removeOrder(item.id);
  }
 
}
