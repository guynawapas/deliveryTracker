import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { Order, OrderService } from 'src/app/services/order.service';
import { NavController } from '@ionic/angular';
import { isNgTemplate } from '@angular/compiler';
import { OrderWithDict, OrderWithDictService } from 'src/app/services/order-with-dict.service';
declare var google:any;
/****************************************************************************************   
 * 
 * 
 *                          display Orders 
 * 
 * 
 * **************************************************************************************/
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit,AfterContentInit {
  map;

  @ViewChild('mapElement', {static:true}) mapElement;
  infoWindows: any = [];
  /*
  *    order
  */

  
  markers : any = [
    {
      title: "Wat Bowon Niwet",
      latitude: "13.757273",
      longitude: "100.502897"
    },
    {
      title: "Bang Lamung",
      latitude: "13.756194",
      longitude: "100.509926"
    },
    {
      title: "Chakkraphatdi road",
      latitude: "13.756185",
      longitude: "100.509804"
    }
  ];


  orders:OrderWithDict[];
  nearOrders:OrderWithDict[]=[];
  intervalOrders:OrderWithDict[]=[];
  currentHour:number;
  d= new Date();
  constructor(private orderWithDictService: OrderWithDictService, private nav:NavController) { }

  ngOnInit() {
    this.orderWithDictService.getOrders().subscribe( res =>{
       this.orders= res;
       console.log(this.orders);
       
     
      this.filterInterval();
    });
   
    
  }

  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: {lat: 13.7563, lng: 100.5018},
        zoom: 15
      });
    this.addMarkersToMap(this.markers);
    console.log(this.infoWindows);
  } 
  
  addMarkersToMap(markers) {
    for(let marker of markers){
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      })

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' + 
                              '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longitude + '</p>' +
                            '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
      console.log('click!',marker.title);
    });
    this.infoWindows.push(infoWindow);
    
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }



  //filter Order that is near us (0,0)
  filterOrders(){
    for(let i=0;i<this.orders.length;i++){
      if(this.orders[i].lat<5&&this.orders[i].long<5){
        this.nearOrders.push(this.orders[i]);
      }
    }
  }

  remove(item){
    this.orderWithDictService.removeOrder(item.id);
  }
  getCurrentHour():number{
    console.log('getcurrentHour called');
    return this.d.getHours();
  }
  getCurrentDate(){
    return this.d.getDate();
  }
  
  getNextInterval():number{
    this.currentHour=this.getCurrentHour();
    let nextInterval=0;
    if(this.currentHour%2==0){
      nextInterval = 2+this.currentHour;
    }else{
      nextInterval = 1+this.currentHour;
    }
    return nextInterval;
  }
  filterInterval(){
    //console.log('filter called');
  
    let nextInterval = this.getNextInterval();
    let today = this.getCurrentDate();
    for(let ele of this.orders){
     // console.log(ele);
      //add all order needed to be delivered in next interval
      let x = ele.date.substring(5,7);
      let orderDate:number = +x;
      //console.log(ele.time,orderDate,x);
      
      if(ele.time==nextInterval && orderDate== today){
        //console.log("pushed!");
        this.intervalOrders.push(ele);
      }
     //console.log(this.intervalOrders);
    }
  }
}
