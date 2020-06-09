import { Injectable } from '@angular/core';
import UIkit from 'uikit';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor() { }

	save(storageDataType: StorageDataTypes, data: string) {
		localStorage.setItem(StorageDataTypes[storageDataType], data);
		UIkit.notification(`Save to StorageData [${StorageDataTypes[storageDataType]}]`, 'success');
	}

	load(storageDataType: StorageDataTypes) {
		return localStorage.getItem(StorageDataTypes[storageDataType]);
	}
}

export enum StorageDataTypes {
	model = 'model',
	mobilenet = 'mobilenet'
}
