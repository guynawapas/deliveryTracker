import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DropboxDetailPage } from './dropbox-detail.page';

describe('DropboxDetailPage', () => {
  let component: DropboxDetailPage;
  let fixture: ComponentFixture<DropboxDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropboxDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DropboxDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
