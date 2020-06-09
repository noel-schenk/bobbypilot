import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficLightTrainingComponent } from './traffic-light-training.component';

describe('TrafficLightTrainingComponent', () => {
  let component: TrafficLightTrainingComponent;
  let fixture: ComponentFixture<TrafficLightTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficLightTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficLightTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
