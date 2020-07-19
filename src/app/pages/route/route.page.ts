import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


declare var google: any;
@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
})
export class RoutePage {
  id: any;
  driver: any;
  map: any;
  infoWindows: any = [];
  array: any = [];
  assignOrders: Observable<any>;
  driverCollections: AngularFirestoreCollection<any>;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  constructor(private route: ActivatedRoute, private afs: AngularFirestore) { }

  ionViewDidEnter() {

    this.driver = this.route.snapshot.paramMap.get('name');
    this.displayMap();
  }

  getAssignOrders() {

    this.driverCollections = this.afs.collection(
      'Driver/' + this.driver + '/orders');
    this.assignOrders = this.driverCollections.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )


    );
    this.assignOrders.subscribe(assignOrders => {
      this.array = assignOrders;
      console.log('array', this.array);
      this.addMarkersToMaps(this.array);
    });

  }

  displayMap() {

    this.getAssignOrders();
    const location = new google.maps.LatLng(13.7563, 100.5018);

    const option = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, option);
    


  }
  addMarkersToMaps(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        orderId: marker.orderId,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      //console.log('done', mapMarker);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
      '<h2 id="firstHeading" class"firstHeading">' + marker.orderId + '</h2>' +
      '<p>Latitude: ' + marker.latitude + '</p>' +
      '<p>Longitude: ' + marker.longitude + '</p>' +
    '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }
  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

}

