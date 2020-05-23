import { Injectable } from '@angular/core';
import { CameraService } from './camera.service';
import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Direction } from './test-training/test-training.component';
import { MachineComponent } from './machine/machine.component';
import { Resolve } from '@angular/router';
import { Subject } from 'rxjs';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { async } from '@angular/core/testing';

@Injectable({
	providedIn: 'root'
})
export class MlService implements Resolve<any> {
	classifier: knnClassifier.KNNClassifier
	net: mobilenet.MobileNet;

	webcamIterator: any;

	set webcam(webcam: HTMLVideoElement) {
		tf.data.webcam(webcam).then(webcamIterator => {
			this.webcamIterator = webcamIterator;
		});
	}

	machineComponent: MachineComponent;

	private _loaded = new Subject();
	private loaded = this._loaded.toPromise();


	constructor() {
		this.init();
	}

	async init() {
		this.classifier = knnClassifier.create();
		this.net = await mobilenet.load();
		this.predict();

		this._loaded.complete();
		console.log('ML Service loaded');
	}

	async train(direction: Direction) {
		if (this.webcamIterator) {
			const img: tf.Tensor3D = await this.webcamIterator.capture();
			const activation = this.net.infer(img, true);

			this.classifier.addExample(activation, direction);

			img.dispose();
			console.log('trained model');
		}
	}

	async predict() {
		while(true) {
			if (this.classifier.getNumClasses() > 0 && this.webcamIterator) {
				const img = await this.webcamIterator.capture();
				const activation = (this.net.infer as any)(img, 'conv_preds');

				const result = await this.classifier.predictClass(activation);
				this.machineComponent ? this.machineComponent.direction = result.label as any as number : undefined;

				img.dispose();
			}
			await tf.nextFrame();
		}
	}

	resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
		return this.loaded;
	}
}