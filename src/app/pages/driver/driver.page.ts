import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {

  driver : any;
  drivers: any = [
    {
      name: "A01",
      status: 0
    },
    {
      name: "A02",
      status: 0
    }];
    array: any=[];

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore,private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.data['special']){
      this.array = this.route.snapshot.data['special'];
      console.log('special exist',this.route.snapshot.data['special']);
    }
    this.drivers = this.array;
    console.log('drivers',this.drivers);

  }

}
