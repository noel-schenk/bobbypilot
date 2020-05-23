import { Injectable } from '@angular/core';
import { MlService } from './ml.service';

@Injectable({
	providedIn: 'root'
})
export class CameraService {
	stream: MediaStream;
	_cameraPreview = document.createElement('video');

	set cameraPreview(cameraPreview) {
		this._cameraPreview = cameraPreview;
		this.MlService.webcam = this._cameraPreview;
	}

	get cameraPreview() {
		return this._cameraPreview;
	}
	constructor(private MlService:MlService) { }
}
