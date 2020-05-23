import { async, TestBed } from '@angular/core/testing';
import { SteeringIndicatorComponent } from './steering-indicator.component';
describe('SteeringIndicatorComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SteeringIndicatorComponent]
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
//# sourceMappingURL=steering-indicator.component.spec.js.map