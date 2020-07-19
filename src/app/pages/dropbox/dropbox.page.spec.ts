import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DropboxPage } from './dropbox.page';

describe('DropboxPage', () => {
  let component: DropboxPage;
  let fixture: ComponentFixture<DropboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DropboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
