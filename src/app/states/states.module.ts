import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { StateDetailComponent } from './state-detail.component';
import { StateAddFormComponent } from './state-add-form.component';
import { StatesComponent } from './states.component';
import { StatesRoutingModule } from './states-routing.module';
@NgModule({
	imports: [
		CommonModule,
		StatesRoutingModule,
		NgbModule,
		FormsModule
	],
	declarations: [
		StateDetailComponent,
		StatesComponent,
		StateAddFormComponent
	]
})
export class StatesModule { }
