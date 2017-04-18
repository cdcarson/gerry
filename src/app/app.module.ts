import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';

import * as _ from "lodash";
import { VarianceService } from './variance.service';
import { StateDataService } from './state-data.service';
import { StatesModule } from './states/states.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		RouterModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		StatesModule,
		NgbModule.forRoot()
	],
	providers: [VarianceService, StateDataService, DecimalPipe],
	bootstrap: [AppComponent]
})
export class AppModule { }
