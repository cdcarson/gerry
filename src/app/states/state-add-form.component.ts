import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import * as _ from 'lodash';

@Component({
	selector: 'state-add-form',
	templateUrl: './state-add-form.component.html',
	styleUrls: ['./state-add-form.component.css']
})
export class StateAddFormComponent implements OnInit {
	private data: any;
	private added: number = 0;

	@Output() onStateAdded = new EventEmitter<object>();

	constructor(private decimalPipe: DecimalPipe){}

	ngOnInit() {
		this.reset()
	}
	submit(){
		this.added++;
		this.data.id = _.uniqueId('state')
		this.data.abbreviation = 'ST' + this.added;
		this.onStateAdded.emit(this.data);
		this.reset();
	}
	reset(){
		this.data = {
			name: 'New State ' + (this.added + 1),
			population: 1234567
		}
	}


}
