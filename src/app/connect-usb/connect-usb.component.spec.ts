import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectUsbComponent } from './connect-usb.component';

describe('ConnectUsbComponent', () => {
  let component: ConnectUsbComponent;
  let fixture: ComponentFixture<ConnectUsbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectUsbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectUsbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
