import { Component, OnInit } from '@angular/core';
import { OrderWithDict, OrderWithDictService } from 'src/app/services/order-with-dict.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-with-dict',
  templateUrl: './order-with-dict.page.html',
  styleUrls: ['./order-with-dict.page.scss'],
})
export class OrderWithDictPage implements OnInit {
//order:OrderWithDict=new Map();
order:OrderWithDict;
item1:number;
item2:number;
  constructor(private orderWithDictService:OrderWithDictService,
    private route:ActivatedRoute,
    private nav:NavController
    ) { }

  ngOnInit() {
    console.log('onInit');
   
    
    
    
  }
  saveOrder(){
    this.order={"item1":this.item1,"item2":this.item2};
    console.log(this.order["item1"]);
    // let itemMap= new Map();
    // console.log('create map');
    // itemMap.set('item1',this.item1);
    // itemMap.set('item2',this.item2);
    // this.order=itemMap;
    
    this.orderWithDictService.addOrder(this.order);
    this.nav.navigateBack('orders');
  }
}
