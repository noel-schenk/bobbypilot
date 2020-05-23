import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import UIkit from 'uikit';
let ControllerComponent = class ControllerComponent {
    constructor() {
        this.gamepad; // tell the browser to activate the gamepad api
    }
    get gamepad() {
        return navigator.getGamepads()[0];
    }
    ngOnInit() {
    }
    loadGamepad() {
        if (this.gamepad === null) {
            UIkit.notification('Gamepad not found', 'danger');
        }
        else {
            UIkit.notification('Gamepad connected', 'success');
            this.initVisualizeGamepad();
        }
    }
    initVisualizeGamepad() {
        this.drawVisualizeGamepadJoystick(0, 0);
        setInterval(() => {
            const tmpGamepad = this.gamepad;
            if (tmpGamepad.axes[0] !== 0 || tmpGamepad.axes[1] !== 0) {
                this.drawVisualizeGamepadJoystick(tmpGamepad.axes[0], tmpGamepad.axes[1]);
            }
            else if (tmpGamepad.axes[2] !== 0 || tmpGamepad.axes[3] !== 0) {
                this.drawVisualizeGamepadJoystick(tmpGamepad.axes[2], tmpGamepad.axes[3]);
            }
            else if (tmpGamepad.axes[6] !== 0 || tmpGamepad.axes[7] !== 0) {
                this.drawVisualizeGamepadJoystick(tmpGamepad.axes[6], tmpGamepad.axes[7]);
            }
            else if (tmpGamepad.buttons[0].pressed === true) {
                this.drawVisualizeGamepadButton('A');
            }
            else if (tmpGamepad.buttons[1].pressed === true) {
                this.drawVisualizeGamepadButton('B');
            }
            else if (tmpGamepad.buttons[2].pressed === true) {
                // unkown button
            }
            else if (tmpGamepad.buttons[3].pressed === true) {
                this.drawVisualizeGamepadButton('X');
            }
            else if (tmpGamepad.buttons[4].pressed === true) {
                this.drawVisualizeGamepadButton('Y');
            }
            else if (tmpGamepad.buttons[5].pressed === true) {
                // unkonw
            }
            else if (tmpGamepad.buttons[6].pressed === true) {
                this.drawVisualizeGamepadButton('L1');
            }
            else if (tmpGamepad.buttons[7].pressed === true) {
                this.drawVisualizeGamepadButton('R1');
            }
            else {
                this.clearDrawVisualizeGamepad();
            }
        });
    }
    initDrawVisualizeGamepad() {
        const visualizeGamepad = this.visualizeGamepad.nativeElement;
        visualizeGamepad.hidden = false;
        return visualizeGamepad.getContext('2d');
    }
    clearDrawVisualizeGamepad() {
        const visualizeGamepad = this.visualizeGamepad.nativeElement;
        const visualizeGamepadContext = this.initDrawVisualizeGamepad();
        visualizeGamepadContext.clearRect(0, 0, visualizeGamepad.width, visualizeGamepad.height);
    }
    drawVisualizeGamepadButton(button) {
        const visualizeGamepad = this.visualizeGamepad.nativeElement;
        const visualizeGamepadContext = this.initDrawVisualizeGamepad();
        this.clearDrawVisualizeGamepad();
        visualizeGamepadContext.font = "30px Arial";
        visualizeGamepadContext.fillText('You pressed: ' + button, 20, 20);
    }
    drawVisualizeGamepadJoystick(x, y) {
        const visualizeGamepad = this.visualizeGamepad.nativeElement;
        const visualizeGamepadContext = this.initDrawVisualizeGamepad();
        x++;
        y++;
        const isualizeGamepadCenterX = x / 2 * visualizeGamepad.width;
        const isualizeGamepadCenterY = y / 2 * visualizeGamepad.height;
        var radius = 10;
        this.clearDrawVisualizeGamepad();
        visualizeGamepadContext.beginPath();
        visualizeGamepadContext.arc(isualizeGamepadCenterX, isualizeGamepadCenterY, radius, 0, 2 * Math.PI, false);
        visualizeGamepadContext.fillStyle = 'green';
        visualizeGamepadContext.fill();
    }
};
__decorate([
    ViewChild('visualizeGamepad')
], ControllerComponent.prototype, "visualizeGamepad", void 0);
ControllerComponent = __decorate([
    Component({
        selector: 'app-controller',
        templateUrl: './controller.component.html',
        styleUrls: ['./controller.component.scss']
    })
], ControllerComponent);
export { ControllerComponent };
//# sourceMappingURL=controller.component.js.map