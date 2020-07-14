import { Component, OnInit } from '@angular/core';
import { OrderWithDict, OrderWithDictService} from 'src/app/services/order-with-dict.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-with-dict',
  templateUrl: './order-with-dict.page.html',
  styleUrls: ['./order-with-dict.page.scss'],
})
export class OrderWithDictPage implements OnInit {
//order:OrderWithDict=new Map();
order:OrderWithDict={
  items:{},
  orderId:'',
  lat:undefined,
  long:undefined,
  time:undefined,
  date:'',
};
item1Name:string;
item2Name:string;
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
    
    this.order.items[this.item1Name]=this.item1;
    this.order.items[this.item2Name]=this.item2;
    for(const key in this.order){
      console.log(key);
      console.log(this.order[key]);
    }
    // let itemMap= new Map();
    // console.log('create map');
    // itemMap.set('item1',this.item1);
    // itemMap.set('item2',this.item2);
    // this.order=itemMap;
    
    this.orderWithDictService.addOrder(this.order);
    this.nav.navigateBack('orders');
  }
}
