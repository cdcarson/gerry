import { Component, OnInit, Input, Output, ElementRef, Renderer2, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import * as _ from 'lodash';

@Component({
	selector: 'state-detail',
	templateUrl: './state-detail.component.html',
	styleUrls: ['./state-detail.component.css']
})
export class StateDetailComponent implements OnInit {
	private open: boolean;
	private value: string;
	private log;
	@ViewChild('populationInput') populationInput:ElementRef;

	@Input() state;
	@Output() onStateChanged = new EventEmitter<object>();

	constructor(private renderer: Renderer2, private decimalPipe: DecimalPipe){}

	ngOnInit() {
		this.open = false;
		this.log = Math.log(this.state.population);
		this.value = this.decimalPipe.transform(this.state.population);
	}
	onChange(){
		let value = parseInt(this.value.replace(/\D/g, ''));
		if (_.isNaN(value)){
			value = this.state.population;
		}
		this.value = this.decimalPipe.transform(value);
		this.state.population = value;
		this.log = Math.log(this.state.population);
		this.onStateChanged.emit(this.state);
	}

	// ngAfterViewInit() {
	// //   this.renderer.listen(this.populationInput.nativeElement, 'focus', () => {
	// // 	  this.onInputFocussed();
	// //   });
	// //   this.renderer.listen(this.populationInput.nativeElement, 'blur', () => {
	// // 	  this.onInputBlurred();
	// //   });
	//
 //  	}
	// onInputFocussed() {
	// 	this.renderer.setValue(this.populationInput.nativeElement, this.state.population);
	// 	this.renderer.setAttribute(this.populationInput.nativeElement, 'type', 'number');
	// 	this.open = true;
	// }
	// onInputBlurred() {
	// 	this.renderer.setAttribute(this.populationInput.nativeElement, 'type', 'text')
	// 	this.renderer.setValue(this.populationInput.nativeElement, this.decimalPipe.transform(this.state.population));
	// 	this.open = false;
	// }
	//
	// openEditor(): void {
	// 	this.populationInput.nativeElement.focus();
	//
	// }
	// closeEditor(): void {
	// 	this.populationInput.nativeElement.blur();
	// }
}
