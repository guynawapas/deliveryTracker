import { Component, OnInit } from '@angular/core';
import { OrderWithDict, OrderWithDictService} from 'src/app/services/order-with-dict.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StockService } from 'src/app/services/stock.service';
/******************************page to add order******************************************/
@Component({
  selector: 'app-order-with-dict',
  templateUrl: './order-with-dict.page.html',
  styleUrls: ['./order-with-dict.page.scss'],
})
export class OrderWithDictPage implements OnInit {

order:OrderWithDict={
  items:{},
  orderId:'',
  lat:undefined,
  long:undefined,
  time:undefined,
  date:'',
  delivered:false,
  dropbox:''
};
item1Name:string;
item2Name:string;
item1:number;
item2:number;
time:string;
d = new Date();
minDate=new Date().toISOString();
maxDate=new Date().toISOString();

  constructor(private orderWithDictService:OrderWithDictService,
    private route:ActivatedRoute,
    private nav:NavController,
    private stockService:StockService
    ) { }

  ngOnInit() {
    this.d.setDate(this.d.getDate()+1);
    this.maxDate=this.d.toISOString();
    
  }
  saveOrder(){
   if(this.order.dropbox!="noDropbox"){
    if(this.order.dropbox=='boxA'){
      this.order.lat=13.782356;
      this.order.long=100.567288;
    }else if(this.order.dropbox=='boxB'){
      this.order.lat=13.789129;
      this.order.long=100.553405;
    }else if(this.order.dropbox=='boxC'){
      this.order.lat=13.778876;
      this.order.long=100.561817;
    }else if(this.order.dropbox=='boxD'){
      this.order.lat=13.795878;
      this.order.long=100.554569;
    }
   }
    
    this.stockService.deductFromStock(this.order);
    this.order.items[this.item1Name]=this.item1;
    this.order.items[this.item2Name]=this.item2;
    this.order.time=+this.time;
    
    this.orderWithDictService.addOrder(this.order);
    this.nav.navigateBack('orders');
  }

}
