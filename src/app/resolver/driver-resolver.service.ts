import { Injectable } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DriverResolverService implements Resolve<any>{

  constructor(private driverService:DriverService) { }
  resolve(route:ActivatedRouteSnapshot){
    let id = route.paramMap.get('id');
    return this.driverService.getData(id);
  }
}
