import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from 'src/app/services/order.service';
import { NavController } from '@ionic/angular';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders:Order[];
  nearOrders:Order[]=[];
  constructor(private orderService: OrderService, private nav:NavController) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(res =>{
       this.orders=res;
       //console.log(this.orders);
       //filter called here cus it broke when call outside...
      this.filterOrders();
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
    this.orderService.removeOrder(item.id);
  }
 
}
