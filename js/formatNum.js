function d(input) {
	return N.scientific(input)
}

class Notation {
	constructor() {
	}
	
	scientific(input) {
		let output = '';

		output = t2d(num(input).floor().toString());
		
		return output;
	}
}

function t2d(input) {
	const WHOLE_PART = /\d+/;
	const DECIMAL_PLACES = /\.\d{2}/;
	const EXPONENT = /e\d+$/;
	
	let wholePart = input.match(WHOLE_PART)[0];
	let output = wholePart;
	if (input.search(DECIMAL_PLACES) != -1) {
		let decimalPlaces = input.match(DECIMAL_PLACES)[0];
		output += decimalPlaces;
	}
	if (input.search(EXPONENT) != -1) {
		let exponent = input.match(EXPONENT)[0];
		output += exponent;
	}
	
	return output;
}

let N = new Notation();