import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';


const statePopulationData = {
	"Alabama": 4863300,
	"Alaska": 741894,
	"Arizona": 6931071,
	"Arkansas": 2988248,
	"California": 39250017,
	"Colorado": 5540545,
	"Connecticut": 3576452,
	"Delaware": 952065,
	"Florida": 20612439,
	"Georgia": 10310371,
	"Hawaii": 1428557,
	"Idaho": 1683140,
	"Illinois": 12801539,
	"Indiana": 6633053,
	"Iowa": 3134693,
	"Kansas": 2907289,
	"Kentucky": 4436974,
	"Louisiana": 4681666,
	"Maine": 1331479,
	"Maryland": 6016447,
	"Massachusetts": 6811779,
	"Michigan": 9928300,
	"Minnesota": 5519952,
	"Mississippi": 2988726,
	"Missouri": 6093000,
	"Montana": 1042520,
	"Nebraska": 1907116,
	"Nevada": 2940058,
	"New Hampshire": 1334795,
	"New Jersey": 8944469,
	"New Mexico": 2081015,
	"New York": 19745289,
	"North Carolina": 10146788,
	"North Dakota": 757952,
	"Ohio": 11614373,
	"Oklahoma": 3923561,
	"Oregon": 4093465,
	"Pennsylvania": 12784227,
	"Rhode Island": 1056426,
	"South Carolina": 4961119,
	"South Dakota": 865454,
	"Tennessee": 6651194,
	"Texas": 27862596,
	"Utah": 3051217,
	"Vermont": 624594,
	"Virginia": 8411808,
	"Washington": 7288000,
	"West Virginia": 1831102,
	"Wisconsin": 5778708,
	"Wyoming": 585501
};

const abbr = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
];
class State {
	name: string;
	population: number;

}
class StatesData {
	states: State[] = [];
	constructor() {
		let self = this;
		_.each(statePopulationData, (population, name) => {
			self.states.push({name: name, population: population});
		});
	}
}


@Injectable()
export class StateDataService {

	getBaseData(): object[] {
		let d = _.clone(statePopulationData);
		let arr = [];
		_.each(d, (p, n) =>{
			let abbrObj = _.find(abbr, {name: n});
			arr.push({
				name: n,
				population: p,
				abbreviation: abbrObj.abbreviation,
				id: abbrObj.abbreviation
			})
		})
		return arr;
	}

}
