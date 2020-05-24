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
import { tensor2d, Tensor2D, TypedArray } from '@tensorflow/tfjs';
import Utils from './utils';
import { FileUploadService } from './file-upload.service';

@Injectable({
	providedIn: 'root'
})
export class MlService implements Resolve<any> {
	classifier: knnClassifier.KNNClassifier
	net: mobilenet.MobileNet;

	webcamIterator: any;

	setWebcam(videoElement: HTMLVideoElement, deviceId: string) {
		tf.data.webcam(videoElement, {deviceId: deviceId}).then(webcamIterator => {
			this.webcamIterator = webcamIterator;
		});
	}

	machineComponent: MachineComponent;

	private _loaded = new Subject();
	private loaded = this._loaded.toPromise();


	constructor(private fileUploadService: FileUploadService) {
		this.init();
	}

	async init() {
		this.classifier = knnClassifier.create();
		this.net = await mobilenet.load();
		this.predict();
		this.load();

		this._loaded.complete();
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

	async save() {
		const classifierDataset = this.classifier.getClassifierDataset();
		let dataset = new Array();

		Object.keys(classifierDataset).forEach(key => {
			let classifierData = classifierDataset[key];
			dataset[key] = new TensorData(key, classifierData.arraySync(), classifierData.shape, classifierData.dtype);
		});
		Utils.downloadObjectAsJson(dataset, Utils.getTimestamp() + '_classifierDataset_bobbypilot');
	}

	async load() {
		this.fileUploadService.fileLoaded.subscribe(file => {
			let tensorDataArr = new Array<TensorData>();
			let classDatasetMatrices: {[label: string]: tf.Tensor2D} = {};
			tensorDataArr = JSON.parse(file);
			tensorDataArr.forEach(tensorData => {
				classDatasetMatrices[tensorData.key] = tf.tensor2d(tensorData.values, tensorData.shape, tensorData.dtype);
			});
			this.classifier.setClassifierDataset(classDatasetMatrices);
		});
	}

	resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
		return this.loaded;
	}
}

class TensorData {
	constructor(
		public key: string,
		public values: TypedArray | number[] | number[][] | boolean[] | boolean[][] | string[] | string[][] | Uint8Array[] | Uint8Array[][],
		public shape?: [number, number],
		public dtype?: "string" | "float32" | "int32" | "bool" | "complex64"
 	) {}
}