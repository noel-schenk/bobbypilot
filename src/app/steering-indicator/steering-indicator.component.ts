import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'app-steering-indicator',
	templateUrl: './steering-indicator.component.html',
	styleUrls: ['./steering-indicator.component.scss']
})
export class SteeringIndicatorComponent implements OnInit {
	@Input()
	angle = 0;

	@HostBinding('style.transform')
	get rotateAngle() {return `rotate(${this.angle}deg)`;}

	constructor() { }

	ngOnInit() {}
}
