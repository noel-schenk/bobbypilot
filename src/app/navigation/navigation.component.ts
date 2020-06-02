import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {

	@ViewChild('map')
	map: ElementRef<HTMLElement>;

	constructor() { }

	ngAfterViewInit() {
		const mapboxMap = new Map({
			accessToken: 'pk.eyJ1Ijoibm9lbGVsaWFzIiwiYSI6ImNrYWxqejJudjB2YXoyenBpbjd4dHpwODQifQ.1r5Vd5fnWS6Zrb9eFkBs4w',
			container: this.map.nativeElement,
			style: 'mapbox://styles/mapbox/streets-v11',
			pitch: 60,
			center: [7.593558, 50.347312],
			zoom: 18,
			bearing: -12
		});
		(window as any).mapboxMap = mapboxMap;
	}

}
