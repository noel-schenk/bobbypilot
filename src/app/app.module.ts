import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraSelectorComponent } from './camera-selector/camera-selector.component';
import { RouterModule, RouterEvent } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControllerComponent } from './controller/controller.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { SteeringIndicatorComponent } from './steering-indicator/steering-indicator.component';
import { TestTrainingComponent } from './test-training/test-training.component';
import { MachineComponent } from './machine/machine.component';
import { MlService } from './ml.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileDownloadComponent } from './file-download/file-download.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
	declarations: [
		AppComponent,
		CameraSelectorComponent,
		DashboardComponent,
		ControllerComponent,
		CarInfoComponent,
		SteeringIndicatorComponent,
		TestTrainingComponent,
		MachineComponent,
		FileUploadComponent,
		FileDownloadComponent,
		LoadingComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot([
			{path: '', component: DashboardComponent, resolve: {myData: MlService}},
		])
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
