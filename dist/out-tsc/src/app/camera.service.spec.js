import { TestBed } from '@angular/core/testing';
import { CameraService } from './camera.service';
describe('CameraService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CameraService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=camera.service.spec.js.map