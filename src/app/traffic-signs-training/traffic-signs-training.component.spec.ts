import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficSignsTrainingComponent } from './traffic-signs-training.component';

describe('TrafficSignsTrainingComponent', () => {
  let component: TrafficSignsTrainingComponent;
  let fixture: ComponentFixture<TrafficSignsTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficSignsTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficSignsTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
