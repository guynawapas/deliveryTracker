import { TestBed } from '@angular/core/testing';

import { OrderWithDictService } from './order-with-dict.service';

describe('OrderWithDictService', () => {
  let service: OrderWithDictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderWithDictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
