import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
	cameraPreview: ElementRef<HTMLVideoElement>;

	constructor(private cameraService: CameraService) { }

	ngOnInit() {
		navigator.mediaDevices.enumerateDevices().then(devices => {
			this.cameraDevices = devices.filter(device => device.kind == 'videoinput');
			this.selectCamera(this.cameraDevices[0]);
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
				try {
					this.cameraPreview.nativeElement.srcObject = stream;
					this.cameraService.setCamera(stream, cameraDevice, this.cameraPreview.nativeElement);
				} catch (error) {
					console.error(error);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

}
