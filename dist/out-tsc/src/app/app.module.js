import { __decorate } from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraSelectorComponent } from './camera-selector/camera-selector.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ControllerComponent } from './controller/controller.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { SteeringIndicatorComponent } from './steering-indicator/steering-indicator.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            CameraSelectorComponent,
            DashboardComponent,
            ControllerComponent,
            CarInfoComponent,
            SteeringIndicatorComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            RouterModule.forRoot([
                { path: '', component: DashboardComponent },
            ])
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map