import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';

@Component({
	selector: 'app-connect-usb',
	templateUrl: './connect-usb.component.html',
	styleUrls: ['./connect-usb.component.scss']
})
export class ConnectUsbComponent {
	checkUSBVersion = '';

	constructor(private carService: CarService) { }

	async loadUSB() {
		await this.carService.connect();
		this.testUSB();
	}

	async testUSB() {
		this.checkUSBVersion = new TextDecoder("ascii").decode(await (await this.carService.sendAT('I')).data);
	}

}
