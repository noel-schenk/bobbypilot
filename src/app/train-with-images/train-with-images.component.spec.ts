import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainWithImagesComponent } from './train-with-images.component';

describe('TrainWithImagesComponent', () => {
  let component: TrainWithImagesComponent;
  let fixture: ComponentFixture<TrainWithImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainWithImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainWithImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
