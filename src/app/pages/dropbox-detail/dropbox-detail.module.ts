import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropboxDetailPageRoutingModule } from './dropbox-detail-routing.module';

import { DropboxDetailPage } from './dropbox-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropboxDetailPageRoutingModule
  ],
  declarations: [DropboxDetailPage]
})
export class DropboxDetailPageModule {}
