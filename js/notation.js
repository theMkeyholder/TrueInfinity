function f(num) {
	return N.sci(num);
}

let N = {};

N.sci = function(num, pres = 0) {
	let x = new OmegaNum(num).floor();
	let a = x.array;
	let l = a.length;
	
	if (l == 1) {
		if (x.toNumber() < 1e6) {
			return x.toString();
		} else {
			return x.toNumber().toExponential(pres).toString().replace(/\+/, '');
		}
	} else if (l == 2) {
		if (a[1] == 1) {
			if (x.log10().floor().toNumber() < 1e6) {
				return Math.pow(10, a[0] % 1).toFixed(pres).toString() + 'e' + x.log10().floor().toString()
			} else {
				return 'e' + N.sci(x.log10().floor());
			}	
		} else {
			if (x.log10().floor().toNumber() < 1e6) {
				return Math.pow(10, a[0] % 1).toFixed(0).toString() + 'e' + x.log10().floor().toString()
			} else {
				return 'e' + N.sci(x.log10().floor());
			}	
		}
	} else {
		return num.toString();
	}
}