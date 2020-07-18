import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {

  driver : any;
  drivers: any = [
    {
      name : "A01",
      status : 0
    },
    {
      name : "A02",
      status : 0
    }
  ];

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  ngOnInit() {
  }

}
