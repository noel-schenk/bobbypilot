import { async, TestBed } from '@angular/core/testing';
import { CameraSelectorComponent } from './camera-selector.component';
describe('CameraSelectorComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CameraSelectorComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CameraSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=camera-selector.component.spec.js.map