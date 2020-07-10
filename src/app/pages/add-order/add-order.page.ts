import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.page.html',
  styleUrls: ['./add-order.page.scss'],
})
export class AddOrderPage implements OnInit {
  order:Order={
    orderName:"",
    items:[],
    lat:undefined,
    long:undefined,
    timeToDeliver:undefined
  }
  orderId=null;

  constructor(private orderService: OrderService, 
    private route:ActivatedRoute,
    private nav:NavController) { }

  ngOnInit() {
    this.orderId=this.route.snapshot.params['id'];
    if(this.orderId){
      this.loadOrder();
    }
  }

  loadOrder(){
    this.orderService.getOrder(this.orderId).subscribe(res =>{
      this.order=res;
    })


  }
  saveOrder(){
    //fields not filled
    if(this.order.orderName=="" ||
     this.order.items==[] || 
     this.order.lat==undefined || 
     this.order.long==undefined || 
     this.order.timeToDeliver==undefined){
      return;
    }
    if(this.orderId){
      this.orderService.updateOrder(this.order,this.orderId);
    }else{
      this.orderService.addOrder(this.order);
      this.nav.navigateBack('orders');
    }

  }
  clearFields(){
    this.order.orderName="";
    this.order.items=[];
    this.order.lat=undefined;
    this.order.long=undefined;
    this.order.timeToDeliver=undefined;
  }

}
