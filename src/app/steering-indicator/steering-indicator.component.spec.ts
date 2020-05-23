import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteeringIndicatorComponent } from './steering-indicator.component';

describe('SteeringIndicatorComponent', () => {
  let component: SteeringIndicatorComponent;
  let fixture: ComponentFixture<SteeringIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteeringIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteeringIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
