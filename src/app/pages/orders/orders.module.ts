import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';
import { RouterModule } from '@angular/router';
import { OrdersPage } from './orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,IonicModule,RouterModule.forChild([
      {
        path: '',
        component: OrdersPage
      }
    ]),
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
