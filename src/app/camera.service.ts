import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CameraService {
	stream: MediaStream;
	constructor() { }
}
