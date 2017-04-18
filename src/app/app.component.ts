import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';

import { StateDataService } from './state-data.service';
import { VarianceService } from './variance.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Gerry';
	private states: object[] = [];
	private subject;
	private analysis;
	constructor (
		private stateDataService: StateDataService,
		private varianceService: VarianceService
	) {}

	ngOnInit() {
		this.subject = new Subject();
		this.analysis = {};
		this.reset();
	}
	onChange() {
		this.analysis.total = _.sumBy(this.states, 'population')
	}
	reset() {
		let data = this.stateDataService.getBaseData();
		_.pullAll(this.states, this.states);
		_.each(data, (p, n) => {
			let state = {
				name: n,
				population: p,
				id: _.uniqueId('state')
			}
			this.states.push(state);
		});
		this.onChange();
	}
}
