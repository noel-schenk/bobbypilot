import { Component, OnInit, ViewChild } from '@angular/core';
import { CameraService } from '../camera.service';

@Component({
	selector: 'app-camera-selector',
	templateUrl: './camera-selector.component.html',
	styleUrls: ['./camera-selector.component.scss']
})
export class CameraSelectorComponent implements OnInit {
	cameraDevices = new Array<MediaDeviceInfo>();
	stream: MediaStream;

	@ViewChild('cameraPreview')
	cameraPreview: any;

	constructor(private cameraService: CameraService) { }

	ngOnInit() {
		navigator.mediaDevices.enumerateDevices().then(devices => {
			this.cameraDevices = devices.filter(device => device.kind == 'videoinput');
			console.log(this.cameraDevices);
		});
	}

	selectCamera(cameraDevice: MediaDeviceInfo) {
		const constraints = {
			video: {deviceId: cameraDevice.deviceId},
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

}
