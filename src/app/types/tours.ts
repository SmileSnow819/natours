export interface Location {
	id: string;
	description: string;
	type: string;
	day: number;
	coordinates: [number, number];
}

export interface StartLocation {
	coordinates: [number, number];
	description: string;
	type: string;
	address: string;
}

export interface Guide {
	_id: string;
	name: string;
	email: string;
	role: string;
	photo: string;
}

export interface Tour {
	_id: string;
	id: string;
	name: string;
	duration: number;
	maxGroupSize: number;
	difficulty: string;
	price: number;
	summary: string;
	description: string;
	imageCover: string;
	images: string[];
	startDates: string[];
	ratingsAverage: number;
	ratingsQuantity: number;
	startLocation: StartLocation;
	locations: Location[];
	guides: Guide[];
	durationWeeks?: number;
}

export interface ToursResponse {
	status: string;
	results: number;
	data: {
		data: Tour[];
	};
}
