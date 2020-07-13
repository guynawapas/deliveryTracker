import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderWithDictPageRoutingModule } from './order-with-dict-routing.module';

import { OrderWithDictPage } from './order-with-dict.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderWithDictPageRoutingModule
  ],
  declarations: [OrderWithDictPage]
})
export class OrderWithDictPageModule {}
