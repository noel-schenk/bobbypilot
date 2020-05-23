import { TestBed } from '@angular/core/testing';
import { CarService } from './car.service';
describe('CarService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CarService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=car.service.spec.js.map