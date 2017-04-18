import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { StateDataService } from '../state-data.service';
import { VarianceService } from '../variance.service';

@Component({
	selector: 'states',
	templateUrl: './states.component.html',
	styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

	private states: object[] = [];
	private analysis;
	constructor (
		private stateDataService: StateDataService,
		private varianceService: VarianceService
	) {}

	ngOnInit() {
		this.reset();
	}
	onStateChanged(state) {
	    console.log(state);
		this.analysis = this.analyze();
	}
	onStateAdded(state) {
		this.states.push(state);
		this.analysis = this.analyze();
	}

	analyze() {
		let arr = [];
		let analysis: any = {};
		let dataPoints = _.map(this.states, 'population');
		let minCase = this.varianceService.minVarianceCase(dataPoints);
		let maxCase = this.varianceService.maxVarianceCase(dataPoints);
		let x;
		let y;
		let o;

		analysis.states = this.states.length;
		analysis.total = _.sumBy(this.states, 'population');
		analysis.min = _.min(dataPoints);
		analysis.max = _.max(dataPoints);
		analysis.mean = analysis.total/this.states.length;
		analysis.variance = this.varianceService.twoPassPopulationVariance(dataPoints);
		analysis.standardDeviation = this.varianceService.standardDeviation(dataPoints)
		analysis.dadsNaiveVarianceSquash = this.varianceService.dadsNaiveVarianceSquash(dataPoints);
		analysis.dadsNaiveStandardDeviationSquash = this.varianceService.dadsNaiveStandardDeviationSquash(dataPoints);
		_.each(analysis, (value, key) => {
			arr.push({
				key: key,
				value: value,
				label: _.startCase(key)
			});
		});



		return arr;
	}
	reset() {
		this.states = this.stateDataService.getBaseData();
		this.analysis = this.analyze();
	}

	smallest(n: number) {
		let newStates = this.stateDataService.getBaseData();
		let sorted = _.sortBy(newStates, 'population');
		this.states = sorted.slice(0, n);
		this.analysis = this.analyze();
	}
	largest(n: number) {
		let newStates = this.stateDataService.getBaseData();
		let sorted = _.reverse(_.sortBy(newStates, 'population'));
		this.states = sorted.slice(0, n);
		this.analysis = this.analyze();
	}
	equalize(){
		let newStates = this.stateDataService.getBaseData();
		let sum = _.sumBy(newStates, 'population');
		let mean = Math.round(sum/newStates.length);
		_.each(newStates, (state:any) => {
			state.population = mean;
		});
		this.states = newStates;
		this.analysis = this.analyze();
	}
	unequalize(){
		let newStates = this.stateDataService.getBaseData();
		let sum = _.sumBy(newStates, 'population');
		_.each(newStates, (state:any, n) => {
			state.population = 0;
			if(n === 0){
				state.population = sum;
			}
		});
		this.states = newStates;
		this.analysis = this.analyze();
	}



}
