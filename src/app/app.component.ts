import { Component } from '@angular/core';
import { RouterEvent, Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'bobbypilot';
	loading = true;
	constructor(private router: Router) {
		this.router.events.subscribe((event: RouterEvent) => {
			if (event instanceof NavigationStart) {
				this.loading = true
			}
			if (event instanceof NavigationEnd) {
				this.loading = false
			}
		});
	}
}
