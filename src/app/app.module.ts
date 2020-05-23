import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraSelectorComponent } from './camera-selector/camera-selector.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControllerComponent } from './controller/controller.component';

@NgModule({
	declarations: [
		AppComponent,
		CameraSelectorComponent,
		DashboardComponent,
		ControllerComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot([
			{path: '', component: DashboardComponent},
		])
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
