import { Injectable } from '@angular/core';
import Utils from './utils';
import { Resolve } from '@angular/router';
import { Subject } from 'rxjs';
import * as rxjsOps from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CarService {

	device: USBDevice;
	dataFromELM327 = new Subject<USBInTransferResult>();

	constructor() {}

	private requestDevice() {
		return navigator.usb.requestDevice({
			filters: [{}]
		});
	}

	async connect() {
		this.device = await this.requestDevice();
		await this.device.open();
		await this.device.reset();
		await this.device.selectConfiguration(1);
		await this.device.claimInterface(this.device.configuration.interfaces[0].interfaceNumber);
		await this.device.claimInterface(this.device.configuration.interfaces[1].interfaceNumber);
		this.init();
		return Promise.resolve;
	}

	init() {
		this.awaitData();
		this.co(0x21, 0x22, 0x0009, 0x0000);
		this.co(0x21, 0x20, 0x0000, 0x0000, [0x00960000, 0x000008]);
	}

	co(reqAndRecTypeNumber: number, request: number, value:number, index:number, decData?:Array<number>) {
		let requestType: USBRequestType;
		let recipient: USBRecipient;
		switch (reqAndRecTypeNumber) {
			case 0x00:
				requestType = 'standard',
					recipient = 'device'
				break;
			case 0x21:
				requestType = 'class',
					recipient = 'interface'
				break;
			case 0x40:
				requestType = 'vendor',
					recipient = 'device'
				break;
		}
		let transferRequest: Promise<USBOutTransferResult>;
		if (decData) {
			transferRequest = this.device.controlTransferOut({
				requestType: requestType,
				recipient: recipient,
				request: request,
				value: value,
				index: index
			}, new Uint8Array(decData));
			Utils.logPromiseError(transferRequest);
			return transferRequest;
		}
		else {
			transferRequest = this.device.controlTransferOut({
				requestType: requestType,
				recipient: recipient,
				request: request,
				value: value,
				index: index
			});
			Utils.logPromiseError(transferRequest);
			return transferRequest;
		}

	}

	ci(reqAndRecTypeNumber:number, request:number, value:number, index:number, length:number) {
		let requestType: USBRequestType;
		let recipient: USBRecipient;
		switch (reqAndRecTypeNumber) {
			case 0xa1:
				requestType = 'class',
					recipient = 'interface'
				break;
			case 0xc0:
				requestType = 'vendor',
					recipient = 'device'
				break;
			case 0x80:
				requestType = 'standard',
					recipient = 'device'
				break;
		}
		const transferRequest = this.device.controlTransferIn({
			requestType: requestType,
			recipient: recipient,
			request: request,
			value: value,
			index: index
		}, length);
		Utils.logPromiseError(transferRequest);
		return transferRequest;
	}

	bo(endpointNumber: number, data: Uint8Array) {
		const transferRequest = this.device.transferOut(endpointNumber, data)
		Utils.logPromiseError(transferRequest);
		return transferRequest;
	}

	bi(endpointNumber: number, length: number) {
		const transferRequest = this.device.transferIn(endpointNumber, length)
		Utils.logPromiseError(transferRequest);
		return transferRequest;
	}

	ii(endpointNumber: number, length: number) {
		const transferRequest = this.device.transferIn(endpointNumber, length);
		Utils.logPromiseError(transferRequest);
		return transferRequest;
	}

	stringToAT(val: string) {
		return new TextEncoder().encode('AT' + val + '\r');
	}

	sendAT(val: string) {
		const ATCommand = this.stringToAT(val);
		const ATResult = this.dataFromELM327.pipe(rxjsOps.first()).toPromise();
		this.bo(2, ATCommand);
		return ATResult;
	}

	awaitData() {
		this.bi(2, 128).then(data => {
			console.log(data, 'dataFromELM327');
			this.dataFromELM327.next(data);
			this.awaitData();
		});
	}
}
