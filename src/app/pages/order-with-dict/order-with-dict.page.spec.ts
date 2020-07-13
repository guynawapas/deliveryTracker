import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderWithDictPage } from './order-with-dict.page';

describe('OrderWithDictPage', () => {
  let component: OrderWithDictPage;
  let fixture: ComponentFixture<OrderWithDictPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderWithDictPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderWithDictPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
