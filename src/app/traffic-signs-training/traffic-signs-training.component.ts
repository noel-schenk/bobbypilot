import { Component, OnInit } from '@angular/core';
import Utils from '../utils';
import { MlService, ClassifierTypes } from '../ml.service';

@Component({
	selector: 'app-traffic-signs-training',
	templateUrl: './traffic-signs-training.component.html',
	styleUrls: ['./traffic-signs-training.component.scss']
})
export class TrafficSignsTrainingComponent {
	TrafficSignTypes274 = Utils.getArrayOfEnumValues(TrafficSignTypes274);
	_274 = TrafficSignTypes274.sUndefined;
	constructor(private MlService: MlService) {}

	set s274(trafficSignTypes274: TrafficSignTypes274) {
		this._274 = trafficSignTypes274;
		this.MlService.train(['274', this._274.toString()].toString(), ClassifierTypes.traffic_sign);
	}
  
	get s274() {
		return this._274;
	}
}


export enum TrafficSignTypes {
	s101,
	s102,
	s103,
	s105,
	s108,
	s110,
	s112,
	s114,
	s117,
	s120,
	s121,
	s123,
	s124,
	s125,
	s131,
	s133,
	s136,
	s138,
	s142,
	s151,
	s156,
	s159,
	s162,
	s201,
	s205,
	s206,
	s208,
	s20920,
	s20930,
	s21120,
	s21420,
	s215,
	s220,
	s22220,
	s2231,
	s2232,
	s2233,
	s224,
	s229,
	s237,
	s238,
	s239,
	s240,
	s241,
	s2421,
	s2422,
	s2441,
	s2442,
	s245,
	s250,
	s251,
	s253,
	s254,
	s255,
	s256,
	s258,
	s259,
	s260,
	s261,
	s262,
	s263,
	s264,
	s265,
	s266,
	s267,
	s268,
	s269,
	s2701,
	s2702,
	s272,
	s273,
	s274,
	s2741,
	s2742,
	s275,
	s276,
	s277,
	s278,
	s279,
	s280,
	s281,
	s282,
	s283,
	s28310,
	s28320,
	s28330,
	s286,
	s2901,
	s2902,
	s293,
	s294,
	s295,
	s296,
	s297,
	s2971,
	s298,
	s299,
	s301,
	s306,
	s307,
	s308,
	s310,
	s31140,
	s314,
	s3141,
	s3142,
	s315,
	s318,
	s3251,
	s3252,
	s327,
	s328,
	s3301,
	s3302,
	s3311,
	s3312,
	s33220,
	s33221,
	s33222,
	s33320,
	s33321,
	s340,
	s341,
	s350,
	s354,
	s356,
	s357,
	s358,
	s363,
	s385,
	s3861,
	s3862,
	s3863,
	s390,
	s391,
	s392,
	s393,
	s394,
	s401,
	s405,
	s406,
	s410,
	s415,
	s418,
	s419,
	s421,
	s422,
	s430,
	s432,
	s434,
	s437,
	s438,
	s439,
	s440,
	s442,
	s448,
	s4481,
	s449,
	s450,
	s453,
	s454,
	s4551,
	s4571,
	s4572,
	s458,
	s460,
	s466,
	s4671,
	s4672,
	s501,
	s505,
	s531,
	s545,
	s551,
	s590,
	s600,
	s605,
	s610,
	s615,
	s616,
	s620,
	s625,
	s630,
	s100010,
	s100021,
	s100022,
	s100031,
	s100032,
	s100033,
	s100130,
	s100210,
	s100431,
	s100432,
	s100530,
	s100630,
	s100631,
	s100632,
	s100636,
	s100637,
	s100638,
	s100639,
	s100730,
	s100830,
	s100831,
	s101010,
	s101011,
	s101013,
	s101230,
	s101231,
	s101232,
	s101234,
	s102011,
	s102012,
	s102013,
	s102030,
	s102210,
	s102211,
	s102212,
	s102410,
	s102413,
	s102414,
	s102417,
	s102630,
	s102632,
	s102635,
	s102638,
	s102830,
	s1031,
	s104010,
	s104030,
	s104032,
	s104033,
	s104230,
	s104235,
	s104236,
	s104410,
	s104430,
	s104810,
	s104811,
	s104812,
	s104815,
	s104817,
	s104911,
	s104913,
	s105230,
	s105231,
	s105235,
	s105236,
	s105237,
	s105238,
	s105239,
	s106010,
	s106011,
	s106030,
	none
}

export enum TrafficSignTypes274 {
	s10,
	s20,
	s30,
	s40,
	s50,
	s60,
	s70,
	s80,
	s90,
	s100,
	s110,
	s120,
	s130,
	s140,
	sUnrestricted,
	none
}