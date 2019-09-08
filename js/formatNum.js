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
	const INIT_E = /^e/;
	const WHOLE_PART = /\d+/;
	const DECIMAL_PLACES = /\.\d{2}/;
	const EXPONENT = /e\d+$/;
	let adde = false;
	
	let temp;
	if (input.search(INIT_E) != -1) {
		temp = input.replace(INIT_E, '');
		adde = true;
	} else {
		temp = input;
	}
	
	let output = '';
	if (temp.search(WHOLE_PART) != -1) {
		let wholePart = temp.match(WHOLE_PART)[0];
		output += wholePart;
	} 
	if (temp.search(DECIMAL_PLACES) != -1) {
		let decimalPlaces = temp.match(DECIMAL_PLACES)[0];
		output += decimalPlaces;
	}
	if (temp.search(EXPONENT) != -1) {
		let exponent = temp.match(EXPONENT)[0];
		output += exponent;
	}
	
	if (adde) {
		output = 'e' + output;
	}
	
	return output;
}

let N = new Notation();