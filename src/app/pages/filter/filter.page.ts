import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  filters:{
    date:string,
    driver:string,
    time:string,
    items:string,
    orderId:string

  };
  constructor(private dataService:DataService,
    private nav:NavController,
    private route:Router) { }

  ngOnInit() {
   this.filters={
     date:'any',
     driver:'any',
     time:'any',
     items:'any',
     orderId:'any'
   }
  }
  saveFilter(){
    console.log('saved filter');
    this.dataService.setData("f",this.filters);
    this.route.navigateByUrl('history/f')
  }

}
