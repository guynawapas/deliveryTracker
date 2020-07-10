import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {
  id:string;
  order:Order;


  constructor(private orderService: OrderService, 
    private route:ActivatedRoute,
    private nav:NavController
    ) { }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    this.orderService.getOrder(this.id).subscribe(res =>{
      this.order=res;
    });
  }

  
  


}
