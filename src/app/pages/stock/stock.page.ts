import { Component, OnInit } from '@angular/core';
import { Stock, StockService } from 'src/app/services/stock.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {
  stocks:Stock[];
  stock:Stock;
  constructor(private stockService: StockService,private nav:NavController) { }

  ngOnInit() {
    this.stockService.getStocks().subscribe(res =>{
      this.stocks=res;
      this.stock=this.stocks[0];
      console.log(this.stock);
    });
  }

}
