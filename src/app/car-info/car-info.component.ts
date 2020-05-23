import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import UIkit from 'uikit';
import Utils, { byRef } from '../utils';
import { SteeringIndicatorComponent } from '../steering-indicator/steering-indicator.component';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss']
})
export class CarInfoComponent implements OnInit {

	@ViewChild('speedIndicator')
	speedIndicator: ElementRef<HTMLProgressElement>;

	@ViewChild('steeringIndicator')
	steeringIndicator: ElementRef<SteeringIndicatorComponent>;

	maxSpeed = 140;
	speed = new byRef(0);

	angle = new byRef(0);


  constructor() { }

  ngOnInit() {
	Utils.setVariablesAfterTime(this.speed, 600, 10, 50, 0, 100, 40, 140 , 0);
	Utils.setVariablesAfterTime(this.angle, 600, 20, -30, 170, -170, 0 ,360, 0);
  }

}
