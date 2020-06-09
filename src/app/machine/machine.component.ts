import { Component, OnInit } from '@angular/core';
import { Direction } from '../test-training/test-training.component';
import { MlService } from '../ml.service';
import { TrafficLightTypes } from '../traffic-light-training/traffic-light-training.component';

@Component({
	selector: 'app-machine',
	templateUrl: './machine.component.html',
	styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
	direction = Direction.right;
	trafficLight = TrafficLightTypes.red;

	DirectionTypes = Direction;
	TrafficLightTypes = TrafficLightTypes;


	constructor(private mlService:MlService) {}

	ngOnInit() {
		this.mlService.prediction.straight.subscribe(prediction => {
			this.direction = prediction as any as number;
		})

		this.mlService.prediction.traffic_light.subscribe(prediction => {
			this.trafficLight = prediction as any as number;
		});
		 
	}

}
