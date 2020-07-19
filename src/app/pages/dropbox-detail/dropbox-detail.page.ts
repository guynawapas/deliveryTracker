import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderWithDict } from 'src/app/services/order-with-dict.service';

@Component({
  selector: 'app-dropbox-detail',
  templateUrl: './dropbox-detail.page.html',
  styleUrls: ['./dropbox-detail.page.scss'],
})
export class DropboxDetailPage implements OnInit {
  orders:OrderWithDict[]=[];
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    
    if (this.route.snapshot.data['special']) {
      this.orders = this.route.snapshot.data['special'];
      console.log(this.route.snapshot.data['special']);
    }



  }

}
