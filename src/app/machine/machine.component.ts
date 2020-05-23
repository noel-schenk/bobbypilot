import { Component, OnInit } from '@angular/core';
import { Direction } from '../test-training/test-training.component';
import { MlService } from '../ml.service';

@Component({
	selector: 'app-machine',
	templateUrl: './machine.component.html',
	styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
	direction = Direction.right;

	DirectionTypes = Direction;

	constructor(private MlService:MlService) {}

	ngOnInit() {
		this.MlService.machineComponent = this;
	}

}
