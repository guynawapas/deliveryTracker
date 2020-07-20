import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { Order, OrderService } from 'src/app/services/order.service';
import { NavController } from '@ionic/angular';
import { isNgTemplate } from '@angular/compiler';
import { OrderWithDict, OrderWithDictService } from 'src/app/services/order-with-dict.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service';
import { DriverService } from 'src/app/services/driver.service';
import { Router } from '@angular/router';
declare var google: any;

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
export class OrdersPage implements OnInit, AfterContentInit {
  map;
  status: number;
  driver: any;
  selectItem: any = [];
  orders: OrderWithDict[];
  nearOrders: OrderWithDict[] = [];
  intervalOrders: OrderWithDict[] = [];
  drivers: any = [
    {
      name: "A01",
      status: 0
    },
    {
      name: "A02",
      status: 0
    }];

  @ViewChild('mapElement', { static: true }) mapElement;
  infoWindows: any = [];
  driverCollections: AngularFirestoreCollection<any>;

  /*
  *    order
  */
  markers: any = [];



  currentHour: number;
  d = new Date();
  constructor(private orderWithDictService: OrderWithDictService,
    private nav: NavController,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private dataService: DataService,
    private driverService: DriverService,
    private router: Router
  ) { }

  ngOnInit() { }

  ngAfterContentInit(): void {
  
    this.orderWithDictService.getOrders().subscribe(res => {
      this.orders = res;
      // console.log('orders',this.orders);
      //this.intervalOrders=this.orders;
      this.filterInterval();
      this.markers = this.intervalOrders;

      

      //console.log('markers after = orders',this.markers);
      this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: { lat: 13.789781, lng: 100.567365 },
          zoom: 15
        });
      this.addMarkersToMap(this.markers);
      //console.log('info windows',this.infoWindows);
      //console.log('markers in aftercontent',this.markers);
    });


  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.lat, marker.long);
      let mapMarker = new google.maps.Marker({
        position: position,
        orderId: marker.orderId,
        latitude: marker.lat,
        longitude: marker.long,
        icon: { url:"http://maps.google.com/mapfiles/ms/icons/green-dot.png" }
      })

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
    let cpstore =  [
      {
        orderId: "CP",
        lat: "13.789781",
        long: "100.567365"
      },
      {
        orderId: "A",
        lat: "13.782356",
        long: "100.567288"
      },
      {
        orderId: "B",
        lat: "13.789129",
        long: "100.553405"
      },
      {
        orderId: "C",
        lat: "13.778876",
        long: "100.561817"
      },
      {
        orderId: "D",
        lat: "13.795878",
        long: "100.554569"
      }

    ];
    for( let cp of cpstore){
      let position = new google.maps.LatLng(cp.lat, cp.long);
      let mapMarker = new google.maps.Marker({
        position: position,
        orderId: cp.orderId,
        latitude: cp.lat,
        longitude: cp.long,
        label: cp.orderId
      })
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
    
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent ="";
    if(marker.orderId=='CP Fresh Mart'){
      infoWindowContent = '<div id="content">' +
      '<h2 id="firstHeading" class"firstHeading">' + marker.orderId + '</h2>' +
      '<p>Latitude: ' + marker.latitude + '</p>' +
      '<p>Longitude: ' + marker.longitude + '</p>'
    '</div>';
    }else{
      infoWindowContent = '<div id="content">' +
      '<h2 id="firstHeading" class"firstHeading">' + marker.orderId + '</h2>' +
      '<p>Latitude: ' + marker.latitude + '</p>' +
      '<p>Longitude: ' + marker.longitude + '</p>' +
      '<ion-button id = "select">Select</ion-button>'
    '</div>';
    }

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
      console.log('click!', marker.orderId);

      if(marker.orderId!='CP Fresh Mart'){
        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          document.getElementById('select').addEventListener('click', () => {
            console.log('select button clicked!');
            //code to push the order into array
            //display the order on screen
            marker.setMap(null);
            marker = new google.maps.Marker({
              position: marker.position,
              orderId: marker.orderId,
              latitude: marker.latitude,
              longitude: marker.longitude,
              label: 'selected'
            });
            this.selectItem.push(marker);
            marker.setMap(this.map);
            this.addDeselectTomarker(marker);
          })
        })
      }


    });
    this.infoWindows.push(infoWindow);
  }
  
  // change marker display to deselect
  addDeselectTomarker(marker) {
    let infoWindowContent = '<div id = "content">' +
      '<h2 id  = "firstHeading" class"firstHeading">' + marker.title + '</h2>' +
      '<p>OrderId' + marker.orderId + '</p>' +
      '<p> Latitude : ' + marker.latitude + '</p>' +
      '<p> Longtitude : ' + marker.longitude + '</p>' +
      '<ion-button id = "deselect">deselect</ion-button>'
    '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('deselect').addEventListener('click', () => {
          console.log('select button clicked!');
          //code to push the order into array
          const index = this.selectItem.indexOf(marker);
          if (index > -1) {
            this.selectItem.splice(index, 1);
          }

          //display the order on screen
          marker.setMap(null);
          marker = new google.maps.Marker({
            position: marker.position,
            orderId: marker.orderId,
            latitude: marker.latitude,
            longitude: marker.longitude,
          });
          this.addInfoWindowToMarker(marker);
          marker.setMap(this.map);
        })
      })


    });
    this.infoWindows.push(infoWindow);

  }




  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }



  //filter Order that is near us (0,0)
  filterOrders() {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].lat < 5 && this.orders[i].long < 5) {
        this.nearOrders.push(this.orders[i]);
      }
    }
  }

  remove(item) {
    this.orderWithDictService.removeOrder(item.id);
  }
  getCurrentHour(): number {
    //console.log('getcurrentHour called');
    return this.d.getHours();
  }
  getCurrentDate() {
    return this.d.getDate();
  }

  getNextInterval(): number {
    this.currentHour = this.getCurrentHour();
    let nextInterval = 0;
    if (this.currentHour % 2 == 0) {
      nextInterval = 2 + this.currentHour;
    } else {
      nextInterval = 1 + this.currentHour;
    }
    return nextInterval;
  }
  filterInterval() {
    //console.log('filter called',this.intervalOrders);

    let nextInterval = this.getNextInterval();
    let today = this.getCurrentDate();
    for (let ele of this.orders) {
      // console.log(ele);
      //add all order needed to be delivered in next interval
      let x = ele.date.substring(8, 10);
      let orderDate: number = +x;
      //console.log(ele.time,orderDate,x,today);

      if (ele.time == nextInterval && orderDate == today) {
        //console.log("pushed!");
        this.intervalOrders.push(ele);
      }
    }
    //console.log(this.intervalOrders);
  }

  assignOrder() {
    this.driverCollections = this.afs.collection(
      'Driver/' + this.driver + '/orders');
      var c = this.drivers[this.getDriverIndex(this.driver)]['status'];
      console.log('driver',c);
    for (let itm of this.selectItem) {
      if (itm != null) {
        this.driverCollections.add({
          orderId: itm.orderId,
          latitude: itm.latitude,
          longitude: itm.longitude
        })
        itm.setMap(null);
        c = c + 1;
      }
    }

    this.updataStatus(this.drivers,c);
    this.driverService.setData("42",this.drivers);
    this.selectItem = [];
    this.driver = null;
  }
  getDriverIndex(name){
    let c=0;
    for(let d of this.drivers){
      if(d['name']==name){
        return c
      }
      c++;
    }
    return -1;
  }

  updataStatus(drivers, num) {
    for (let d of drivers) {
      if (d["name"] == this.driver) {
        d["status"] = num;
      }
    }
    console.log('drivers array', this.drivers);
  }
  toDriversPage(){
    //console.log('drivers before navigate',this.drivers);
    this.driverService.setData("42",this.drivers);
    this.router.navigateByUrl('/driver/42');
  }
 
}
