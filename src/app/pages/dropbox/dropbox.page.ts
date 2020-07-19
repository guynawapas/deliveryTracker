import { Component, OnInit } from '@angular/core';
import { OrderWithDictService, OrderWithDict } from 'src/app/services/order-with-dict.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropbox',
  templateUrl: './dropbox.page.html',
  styleUrls: ['./dropbox.page.scss'],
})
export class DropboxPage implements OnInit {
  orders: OrderWithDict[];
  boxOrders: OrderWithDict[] = [];
  constructor(private orderWithDictService:OrderWithDictService,
    private dataService:DataService,
    private route:Router
    ) { }

  ngOnInit() {
    this.orderWithDictService.getOrders().subscribe(res => {
      this.orders = res;
      console.log('orders',this.orders);
    });
  }
  toDetail(boxName:string){
    this.filterBox(boxName);
    this.dataService.setData(boxName,this.boxOrders);
    console.log('boxName is',boxName);
    this.route.navigateByUrl('dropbox-detail/'+boxName);
  }
  filterBox(boxName:string){
    this.boxOrders=[];
    for(let order of this.orders){
      if(order.dropbox==boxName)this.boxOrders.push(order);
    }
    console.log(this.boxOrders);
  }

}
