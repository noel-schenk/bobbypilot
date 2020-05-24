import { Component, OnInit } from '@angular/core';
import { MlService, ClassifierTypes } from '../ml.service';

@Component({
	selector: 'app-test-training',
	templateUrl: './test-training.component.html',
	styleUrls: ['./test-training.component.scss']
})
export class TestTrainingComponent implements OnInit {
	_direction = Direction.right;
	
	set direction(direction: Direction) {
		this._direction = direction;
		this.MlService.train(this._direction, ClassifierTypes.straight);
	}

	get direction() {
		return this._direction;
	}

	DirectionTypes = Direction;

	constructor(private MlService:MlService) { }

	ngOnInit() {
	}

}

export enum Direction {
	left, right, straight
}