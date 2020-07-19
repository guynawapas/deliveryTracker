import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropboxPageRoutingModule } from './dropbox-routing.module';

import { DropboxPage } from './dropbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropboxPageRoutingModule
  ],
  declarations: [DropboxPage]
})
export class DropboxPageModule {}
