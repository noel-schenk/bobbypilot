import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSaveComponent } from './quick-save.component';

describe('QuickSaveComponent', () => {
  let component: QuickSaveComponent;
  let fixture: ComponentFixture<QuickSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
