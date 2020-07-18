import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { Order, OrderService } from 'src/app/services/order.service';
import { NavController } from '@ionic/angular';
import { isNgTemplate } from '@angular/compiler';
import { OrderWithDict, OrderWithDictService } from 'src/app/services/order-with-dict.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service';
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
  driver: any;
  selectItem: any = [];
  orders: OrderWithDict[];
  nearOrders: OrderWithDict[] = [];
  intervalOrders: OrderWithDict[] = [];
  @ViewChild('mapElement', { static: true }) mapElement;
  infoWindows: any = [];
  pendingCollections: AngularFirestoreCollection<any> = this.afs.collection(
    'pending/${this.user.uid}/track');
  driverCollections: AngularFirestoreCollection<any> = this.afs.collection(
    'Driver/' + this.driver + '/orders');

  /*
  *    order
  */


  markers_: any = [
    {
      title: "Wat Bowon Niwet",
      lat: "13.757273",
      long: "100.502897"
    },
    {
      title: "Bang Lamung",
      lat: "13.756194",
      long: "100.509926"
    },
    {
      title: "Chakkraphatdi road",
      lat: "13.756185",
      long: "100.509804"
    }
  ];
  markers: any = [];



  currentHour: number;
  d = new Date();
  constructor(private orderWithDictService: OrderWithDictService, 
    private nav: NavController, 
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore,
    private dataService:DataService
    ) { }

  ngOnInit() { }

  ngAfterContentInit(): void {
    this.orderWithDictService.getOrders().subscribe(res => {
      this.orders = res;
      // console.log('orders',this.orders);
      this.intervalOrders = this.orders;
      this.filterInterval();
      this.markers = this.intervalOrders;
     
        
      
      //console.log('markers after = orders',this.markers);
      this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: { lat: 13.7563, lng: 100.5018 },
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
        longitude: marker.long
      })

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {

    this.pendingCollections = this.afs.collection(
      'pending',
      ref => ref.orderBy('timestamp')
    );
    let infoWindowContent = '<div id="content">' +
      '<h2 id="firstHeading" class"firstHeading">' + marker.orderId + '</h2>' +
      '<p>Latitude: ' + marker.latitude + '</p>' +
      '<p>Longitude: ' + marker.longitude + '</p>' +
      '<ion-button id = "select">Select</ion-button>'
    '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
      console.log('click!', marker.orderId);

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


    });
    this.infoWindows.push(infoWindow);
  }
  // change marker display to deselect
  addDeselectTomarker(marker) {
    let infoWindowContent = '<div id = "content">' +
      '<h2 id  = "firstHeading" class"firstHeading">' + marker.title + '</h2>' +
      '<p>OrderId' + marker.orderId + '</p>'+
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
    //console.log('filter called');

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
      'Driver/' + this.driver + '/orders')
    for (let itm of this.selectItem) {
      if (itm != null) {
        this.driverCollections.add({
          orderId : itm.orderId,
          latitude: itm.latitude,
          longitude: itm.longitude
        })
        itm.setMap(null);
      }
    }
    this.selectItem = [];
    this.driver = null;
  }
}
