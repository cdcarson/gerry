import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class VarianceService {

	constructor() { }

	// adapted from https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance
	twoPassPopulationVariance(list: any[]): number {
		let n: number = list.length;
		let sum1: number;
		let sum2: number;
	 	let mean: number;
		if (n < 2){
			return 0;
		}

		sum1 = 0 + _.sum(list);
		mean = sum1 / n;
		sum2 = _.sumBy(list, (value) => {
			return Math.pow(value - mean, 2);
		});
		// return sum2 / (n - 1);
		// I think the dividing by n is right, rather than (n-1), because we're working from a full dataset...
		return sum2 / n;
	}

	chrisNaiveBucketVariance(list: any[], bucketWidth: number): number {
		let min: number = _.min(list);
		let shifted: number[] =  _.map(list, (value) => {
			return value - min;
		});
		let bucketed: number[] = _.map(shifted, (value) => {
			return Math.round(value/bucketWidth);
		});
		return this.twoPassPopulationVariance(bucketed);
	}
	chrisLogBucketVariance(list: any[]): number {
		let min: number = _.min(list);
		let shifted: number[] =  _.map(list, (value) => {
			return value - min;
		});
		let bucketed: number[] = _.map(shifted, (value) => {
			if (value === 0){
				value = 1/999999999999999;
			}
			return Math.log(value);
		});
		return this.twoPassPopulationVariance(bucketed);
	}

	standardDeviation(list: any[]){
  		let avg = _.sum(list)/list.length;
		let squaredDiffs = _.map(list, (value) => {
			return Math.pow(value - avg, 2);
		});
		let avgSquaredDiff = _.sum(squaredDiffs)/squaredDiffs.length;
  		return Math.sqrt(avgSquaredDiff);
	}

	zScoreTotal(list: any[]){
		let avg = _.sum(list)/list.length;
  		let stdDev = this.standardDeviation(list);
		let zs;
		if (stdDev === 0){
			zs = 0;
		} else {
			zs = _.sum(_.map(list, (value) => {
				return Math.abs((value - avg)/stdDev);
			}));
		}


  		return zs/list.length;
	}
	errFunc(x){
		let a1 = 0.278393, a2 = 0.230389, a3 = 0.000972, a4 = 0.078108;
		if (x <= 0){
			return 0;
		}

		return 1 - (
			1 /
			Math.pow(
				1 +
				(a1 * x) +
				(a2 * x * x) +
				(a3 * x * x * x) +
				(a4 * x * x * x * x) , 4
			)
		);
	}
	dadsNaiveVarianceSquash(list: any[]): number{
		let variance = this.twoPassPopulationVariance(list);
		let worstCase = this.twoPassPopulationVariance(this.maxVarianceCase(list));
		let bestCase = this.twoPassPopulationVariance(this.minVarianceCase(list));
		let range = worstCase - bestCase;
		return range > 0 ? (variance - bestCase) / (worstCase - bestCase) : 0;
	}

	dadsNaiveStandardDeviationSquash(list: any[]): number{
		let stdDev = this.standardDeviation(list);
		let worstCase = this.standardDeviation(this.maxVarianceCase(list));
		let bestCase = this.standardDeviation(this.minVarianceCase(list));
		let range = worstCase - bestCase;
		return range > 0 ? (stdDev - bestCase) / (worstCase - bestCase) : 0;
	}



	minVarianceCase(list: any[]) : number[] {
		let sum: number = _.sum(list);
		let mean: number = sum/list.length;
		let edgeCase: number[] = _.clone(list);
		_.fill(edgeCase, mean);
		return edgeCase;
	}

	maxVarianceCase(list: any[]) : number[] {
		let sum: number = _.sum(list);
		let edgeCase: number[] = _.clone(list);
		_.fill(edgeCase, 0);
		edgeCase[0] = sum;
		return edgeCase;
	}

}
