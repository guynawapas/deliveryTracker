import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, PickerController } from '@ionic/angular';
import {PickerOptions} from '@ionic/core';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.page.html',
  styleUrls: ['./add-order.page.scss'],
})
export class AddOrderPage implements OnInit {
  order:Order={
    orderId:"",
    items:'',
    lat:undefined,
    long:undefined,
    time:undefined,
    date:'',
    
  }
  
  d = new Date();
  minDate=new Date().toISOString();
  maxDate=new Date().toISOString();
  
  constructor(private orderService: OrderService, 
    private route:ActivatedRoute,
    private nav:NavController,
    private pickerCtrl:PickerController) { }

  ngOnInit() {
    
    this.d.setDate(this.d.getDate()+1);
    this.maxDate=this.d.toISOString();
    
  }

  
  saveOrder(){
    //fields not filled
    if(this.order.orderId=="" ||
     this.order.items=='' || 
     this.order.lat==undefined || 
     this.order.long==undefined || 
     this.order.time==undefined||
     this.order.date==''){
      return;
    }
    
      this.orderService.addOrder(this.order);
      this.nav.navigateBack('orders');
    

  }
  clearFields(){
    this.order.orderId="";
    this.order.items='';
    this.order.lat=undefined;
    this.order.long=undefined;
    this.order.time=undefined;
    this.order.date='';
  }

  // async showTimePicker(){
  //   let opts:PickerOptions={
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         role: 'cancel'
  //       },
  //       {
  //         text:'Ok',
  //         handler:(value:any) => {
  //           console.log(value);
  //         }
  //       }
  //     ],
  //     columns:[
  //       {
  //         name:"timeOptions",
  //         options:[
  //           {text:"8:00-10:00",value:8},
  //           {text:"10:00-12:00",value:10},
  //           {text:"12:00-14:00",value:12},
  //           {text:"14:00-16:00",value:14},
  //           {text:"16:00-18:00",value:16},
  //         ]
  //       }

  //     ]

  //   };
  //   let picker =await this.pickerCtrl.create(opts);
  //   picker.present();
  //   picker.onDidDismiss().then(async date =>{
  //     let col = await picker.getColumn('timeOptions');
  //     this.order.time=col.options[col.selectedIndex].value;
  //     console.log(this.order.time);
      
  //   });
    
  // }


}
