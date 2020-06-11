import { Injectable } from '@angular/core';
import { CameraService } from './camera.service';
import * as tf from '@tensorflow/tfjs';
import * as tfc from '@tensorflow/tfjs-core';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Direction } from './test-training/test-training.component';
import { MachineComponent } from './machine/machine.component';
import { Resolve } from '@angular/router';
import { Subject } from 'rxjs';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { async } from '@angular/core/testing';
import { tensor2d, Tensor2D, TypedArray } from '@tensorflow/tfjs';
import { WebcamIterator } from '@tensorflow/tfjs-data/dist/iterators/webcam_iterator';
import Utils from './utils';
import { FileUploadService } from './file-upload.service';
import UIkit from 'uikit';
import { stringify } from 'querystring';
import { StorageService, StorageDataTypes } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class MlService implements Resolve<any> {
	classifiers: { [key in ClassifierTypes]: knnClassifier.KNNClassifier };
	net: mobilenet.MobileNet;

	webcamIterator: WebcamIterator;

	getWebcam() {
		return this.webcamIterator;
	}

	setWebcam(videoElement: HTMLVideoElement, deviceId: string) {
		tf.data.webcam(videoElement, { deviceId: deviceId, facingMode: 'environment' }).then(webcamIterator => {
			this.webcamIterator = webcamIterator;
		});
	}

	private _loaded = new Subject();
	private loaded = this._loaded.toPromise();

	prediction: { [key in ClassifierTypes]: Subject<string> }


	constructor(private fileUploadService: FileUploadService, private storageService: StorageService) {
		this.init();
	}

	async init() {
		await this.loadClassifiers();
		await this.loadPredictions();
		this.net = await mobilenet.load({
			version: 2,
			alpha: 1,
			modelUrl: '/assets/model/mobilenet_v2_1.0_224/model.json'
		});
		this.predict(ClassifierTypes.straight);
		this.load();

		this._loaded.complete();
	}

	async loadClassifiers() {
		this.classifiers =
		{
			turn_right: knnClassifier.create(),
			turn_left: knnClassifier.create(),
			straight: knnClassifier.create(),
			speed: knnClassifier.create(),
			traffic_light: knnClassifier.create(),
			traffic_sign: knnClassifier.create()
		};
	}

	async loadPredictions() {
		this.prediction =
		{
			turn_right: new Subject(),
			turn_left: new Subject(),
			straight: new Subject(),
			speed: new Subject(),
			traffic_light: new Subject(),
			traffic_sign: new Subject()
		};
		this.predict(ClassifierTypes.turn_right);
		this.predict(ClassifierTypes.turn_left);
		this.predict(ClassifierTypes.straight);
		this.predict(ClassifierTypes.speed);
		this.predict(ClassifierTypes.traffic_light);
		this.predict(ClassifierTypes.traffic_sign);
	}

	async train(value: string, type: ClassifierTypes) {
		const classifier = this.getClassifierByType(type);
		if (this.getWebcam()) {
			const img: tf.Tensor3D = await (this.getWebcam() as WebcamIterator).capture();
			const activation = this.net.infer(img, true);

			classifier.addExample(activation, value);

			img.dispose();
			console.log('trained model');
		}
	}

	async predict(type: ClassifierTypes) {
		const classifier = this.getClassifierByType(type);
		while (true) {
			if (classifier.getNumClasses() > 0 && this.getWebcam()) {
				const img = await (this.getWebcam() as WebcamIterator).capture();
				const activation = (this.net.infer as any)(img, 'conv_preds');

				const result = await classifier.predictClass(activation);

				this.prediction[type].next(result.label);

				img.dispose();
			}
			await tf.nextFrame();
		}
	}

	getDatasets() {
		const datasets = new Array();
		Object.keys(this.classifiers).forEach(key => {
			const classifier: knnClassifier.KNNClassifier = this.classifiers[key];
			const classifierDataset = classifier.getClassifierDataset();
			let dataset = new Array();

			Object.keys(classifierDataset).forEach(key => {
				let classifierData = classifierDataset[key];
				dataset.push(new TensorData(key, classifierData.arraySync(), classifierData.shape, classifierData.dtype));
			});
			datasets.push({ key: key, dataset: dataset });
		});
		return datasets;
	}

	loadDatasets(datasetsToLoad: string) {
		let datasets = new Array<{ key: string, dataset: Array<TensorData> }>();
		datasets = JSON.parse(datasetsToLoad);
		datasets.forEach(dataset => {
			let tensorDataArr = dataset.dataset;
			let classDatasetMatrices: { [label: string]: tf.Tensor2D } = {};
			tensorDataArr.forEach(tensorData => {
				classDatasetMatrices[tensorData.key] = tf.tensor2d(tensorData.values, tensorData.shape, tensorData.dtype);
			});
			this.classifiers[dataset.key].setClassifierDataset(classDatasetMatrices);
			UIkit.notification(`Loaded model [${dataset.key}]`, 'success');
		});
	}

	async save() {
		const datasets = this.getDatasets();
		Utils.downloadObjectAsJson(datasets, Utils.getTimestamp() + '_classifierDataset_bobbypilot');
	}

	async load() {
		this.fileUploadService.fileLoaded.subscribe(file => {
			this.loadDatasets(file);
		});
	}

	async localSave() {
		const datasets = this.getDatasets();
		this.storageService.save(StorageDataTypes.model, JSON.stringify(datasets));
	}

	async localLoad() {
		const datasets = this.storageService.load(StorageDataTypes.model);
		this.loadDatasets(datasets);
	}

	getClassifierByType(type: ClassifierTypes) {
		return this.classifiers[type];
	}

	resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
		return this.loaded;
	}
}

export class TensorData {
	constructor(
		public key: string,
		public values: TypedArray | number[] | number[][] | boolean[] | boolean[][] | string[] | string[][] | Uint8Array[] | Uint8Array[][],
		public shape?: [number, number],
		public dtype?: "string" | "float32" | "int32" | "bool" | "complex64"
	) { }
}

export enum ClassifierTypes {
	turn_right = 'turn_right',
	turn_left = 'turn_left',
	straight = 'straight',
	speed = 'speed',
	traffic_light = 'traffic_light',
	traffic_sign = 'traffic_sign',
}