import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderWithDictPage } from './order-with-dict.page';

const routes: Routes = [
  {
    path: '',
    component: OrderWithDictPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderWithDictPageRoutingModule {}
