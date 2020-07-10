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
 
  constructor(private orderService: OrderService, private nav:NavController) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(res =>{
      this.orders=res;
    });

   




  }
  
  remove(item){
    this.orderService.removeOrder(item.id);
  }
 
}
