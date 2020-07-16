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
  orders:OrderWithDict[];
  nearOrders:OrderWithDict[]=[];
  intervalOrders:OrderWithDict[]=[];
  @ViewChild('mapElement', {static:true}) mapElement;
  infoWindows: any = [];
  /*
  *    order
  */

  
  markers_ : any = [
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
  markers:any=[];


  
  currentHour:number;
  d= new Date();
  constructor(private orderWithDictService: OrderWithDictService, private nav:NavController) { }

  ngOnInit() { }

  ngAfterContentInit(): void {
    this.orderWithDictService.getOrders().subscribe( res =>{
      this.orders= res;
     // console.log('orders',this.orders);
      
      this.filterInterval();
      this.markers=this.intervalOrders;
      //console.log('markers after = orders',this.markers);
      this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: {lat: 13.7563, lng: 100.5018},
        zoom: 15
      });
      this.addMarkersToMap(this.markers);
      //console.log('info windows',this.infoWindows);
      //console.log('markers in aftercontent',this.markers);
   });
    
    
  } 
  
  addMarkersToMap(markers) {
    for(let marker of markers){
      let position = new google.maps.LatLng(marker.lat, marker.long);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.orderId,
        latitude: marker.lat,
        longitude: marker.long
      })

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' + 
                              '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longtitude + '</p>' +
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
    //console.log('getcurrentHour called');
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
      let x = ele.date.substring(8,10);
      let orderDate:number = +x;
      //console.log(ele.time,orderDate,x,today);
      
      if(ele.time==nextInterval && orderDate== today){
        //console.log("pushed!");
        this.intervalOrders.push(ele);
      }
    }
    //console.log(this.intervalOrders);
  }
}
