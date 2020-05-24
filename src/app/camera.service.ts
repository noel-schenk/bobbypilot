import { Injectable } from '@angular/core';
import { MlService } from './ml.service';

@Injectable({
	providedIn: 'root'
})
export class CameraService {
	stream: MediaStream;
	device: MediaDeviceInfo;
	videoElement:HTMLVideoElement;

	setCamera(stream: MediaStream, device: MediaDeviceInfo, videoElement: HTMLVideoElement) {
		this.stream = stream;
		this.device = device;
		this.videoElement = videoElement;
		this.MlService.setWebcam(this.videoElement, this.device.deviceId)
	}
	constructor(private MlService:MlService) { }
}
