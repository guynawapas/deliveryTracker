import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DropboxDetailPage } from './dropbox-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DropboxDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DropboxDetailPageRoutingModule {}
