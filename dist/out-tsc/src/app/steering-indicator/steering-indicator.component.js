import { __decorate } from "tslib";
import { Component, HostBinding } from '@angular/core';
let SteeringIndicatorComponent = class SteeringIndicatorComponent {
    constructor() {
        this.angle = 0;
    }
    get rotateAngle() { return `rotate(${this.angle}deg)`; }
    ngOnInit() {
        setTimeout(() => {
            this.angle = 30;
            setTimeout(() => {
                this.angle = -100;
                setTimeout(() => {
                    this.angle = 0;
                }, 400);
            }, 400);
        }, 400);
    }
};
__decorate([
    HostBinding('style.transform')
], SteeringIndicatorComponent.prototype, "rotateAngle", null);
SteeringIndicatorComponent = __decorate([
    Component({
        selector: 'app-steering-indicator',
        templateUrl: './steering-indicator.component.html',
        styleUrls: ['./steering-indicator.component.scss']
    })
], SteeringIndicatorComponent);
export { SteeringIndicatorComponent };
//# sourceMappingURL=steering-indicator.component.js.map