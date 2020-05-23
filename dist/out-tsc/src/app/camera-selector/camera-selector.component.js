import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let CameraSelectorComponent = class CameraSelectorComponent {
    constructor(cameraService) {
        this.cameraService = cameraService;
        this.cameraDevices = new Array();
    }
    ngOnInit() {
        navigator.mediaDevices.enumerateDevices().then(devices => {
            this.cameraDevices = devices.filter(device => device.kind == 'videoinput');
            this.selectCamera(this.cameraDevices[0]);
        });
    }
    selectCamera(cameraDevice) {
        const constraints = {
            video: { deviceId: cameraDevice.deviceId },
            audio: false
        };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(stream => {
            this.cameraService.stream = stream;
            this.cameraPreview.nativeElement.srcObject = stream;
        })
            .catch(error => {
            console.error(error);
        });
    }
};
__decorate([
    ViewChild('cameraPreview')
], CameraSelectorComponent.prototype, "cameraPreview", void 0);
CameraSelectorComponent = __decorate([
    Component({
        selector: 'app-camera-selector',
        templateUrl: './camera-selector.component.html',
        styleUrls: ['./camera-selector.component.scss']
    })
], CameraSelectorComponent);
export { CameraSelectorComponent };
//# sourceMappingURL=camera-selector.component.js.map