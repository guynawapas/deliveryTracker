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
    items:{},
  }
  stockId=null;
  item:string;
  amount:number;
  
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
      console.log('loadStock',this.stock);
    })
  }

  saveStock(){
    if(!this.amount||!this.item)return console.log('fill everything!');
    if(this.stockId){
      for(let key of Object.keys(this.stock.items)){
        if(this.stock.items[this.item]){
          this.stock.items[this.item]+=this.amount;
          this.stockService.updateStock(this.stock,this.stockId);
          this.clearFields();
          return;
        }
      }
      this.stock.items[this.item]=this.amount;
      this.stockService.updateStock(this.stock,this.stockId);
      this.clearFields();
    }else{
      this.stock.items[this.item]=this.amount;
      this.stockService.addStock(this.stock);
      this.nav.navigateBack('home');
    }
  }
  clearFields(){
    this.item='';
    this.amount=undefined;
  }


  
}
