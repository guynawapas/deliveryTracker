import { Component, OnInit } from '@angular/core';
import { Stock, StockService } from 'src/app/services/stock.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.page.html',
  styleUrls: ['./add-stock.page.scss'],
})
export class AddStockPage implements OnInit {
  stock:Stock={
    itemList:["itemName1","itemName2","itemName3"],
    item1:undefined,
    item2:undefined,
    item3:undefined
  }
  stockId=null;
  

  
  constructor(private stockService: StockService,
    private route:ActivatedRoute,
    private nav:NavController
    ) { }

  ngOnInit() {
    this.stockId=this.route.snapshot.params['id'];
    if(this.stockId){
      this.loadStock();
    }
  }

  loadStock(){
    this.stockService.getStock(this.stockId).subscribe(res =>{
      this.stock=res;
    })
  }

  saveStock(){
    if(this.stockId){
      this.stockService.updateStock(this.stock,this.stockId);
    }else{
      this.stockService.addStock(this.stock);
      this.nav.navigateBack('home');
    }
  }


  
}
