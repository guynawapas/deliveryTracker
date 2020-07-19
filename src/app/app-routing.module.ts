import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './resolver/data-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersPageModule)
  },
  {
    path: 'tracking/:id',
    loadChildren: () => import('./pages/tracking/tracking.module').then(m => m.TrackingPageModule)
  },
  {
    path: 'tracking',
    loadChildren: () => import('./pages/tracking/tracking.module').then(m => m.TrackingPageModule)
  },
  {
    path: 'add-order',
    loadChildren: () => import('./pages/add-order/add-order.module').then( m => m.AddOrderPageModule)
  },
  {
    path: 'stock',
    loadChildren: () => import('./pages/stock/stock.module').then( m => m.StockPageModule)
  },{
    path: 'stock/:id',
    loadChildren: () => import('./pages/stock/stock.module').then( m => m.StockPageModule)
  },
  {
    path: 'add-stock',
    loadChildren: () => import('./pages/add-stock/add-stock.module').then( m => m.AddStockPageModule)
  },{
    path: 'add-stock/:id',
    loadChildren: () => import('./pages/add-stock/add-stock.module').then( m => m.AddStockPageModule)
  },
  {
    path: 'order-with-dict',
    loadChildren: () => import('./pages/order-with-dict/order-with-dict.module').then( m => m.OrderWithDictPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },{
    path: 'history/:id',
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'driver',
    loadChildren: () => import('./pages/driver/driver.module').then( m => m.DriverPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./pages/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./pages/route/route.module').then( m => m.RoutePageModule)
  },{
    path: 'route/:id',
    loadChildren: () => import('./pages/route/route.module').then( m => m.RoutePageModule)
  },
  {
    path: 'dropbox',
    loadChildren: () => import('./pages/dropbox/dropbox.module').then( m => m.DropboxPageModule)
  },
  {
    path: 'dropbox-detail',
    loadChildren: () => import('./pages/dropbox-detail/dropbox-detail.module').then( m => m.DropboxDetailPageModule)
  },{
    path: 'dropbox-detail/:id', 
    resolve:{
      special:DataResolverService
    },
    loadChildren: () => import('./pages/dropbox-detail/dropbox-detail.module').then( m => m.DropboxDetailPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
