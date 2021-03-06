import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatesComponent } from './states.component';


const routes: Routes = [
	{
		path: '', component: StatesComponent,
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StatesRoutingModule { }
