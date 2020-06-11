import { Component, OnInit } from '@angular/core';
import { MlService, ClassifierTypes } from '../ml.service';

@Component({
  selector: 'app-traffic-light-training',
  templateUrl: './traffic-light-training.component.html',
  styleUrls: ['./traffic-light-training.component.scss']
})
export class TrafficLightTrainingComponent implements OnInit {

	_trafficLight = TrafficLightTypes.none;
	TrafficLightTypes = TrafficLightTypes;

  constructor(private MlService: MlService) { }
	
  set trafficLight(trafficLight: TrafficLightTypes) {
	  this._trafficLight = trafficLight;
	  this.MlService.train(this._trafficLight.toString(), ClassifierTypes.traffic_light);
  }

  get trafficLight() {
	  return this._trafficLight;
  }

  ngOnInit() {
}

}

export enum TrafficLightTypes {
	red, yellow, green, none
}