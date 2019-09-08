function switchToSection(n) {
	let a = document.querySelectorAll('.section');
	a.forEach((i) => {i.className = 'section'});
	let e = document.querySelector(`#s${n}`);
	e.className = 'section visible';
}

function typeCheck(input, types) {
	let output = false;
	types.forEach((e) => {if ((e == typeof input) == true) output = true});
	return output;
}

function num(input) {
	if (typeCheck(input, ['string', 'number'])) {
		return new OmegaNum(input);
	} else if (input.array) {
		return new OmegaNum(input.array);
	} else {
		return new OmegaNum(0);
	}
}

function getGenPrice(dim, bought) {
	return OmegaNum.pow(2, new OmegaNum(dim).add(new OmegaNum(bought)));
}

function show(id) {
	setdisp(id, 'block');
}

function hide(id) {
	setdisp(id, 'none');
}

function setdisp(id, val) {
	document.getElementById(id).style.display = val;
}

function setElem(id, v) {
	if (document.getElementById(id)) {
		if (document.getElementById(id).innerHTML != v) {
			document.getElementById(id).innerHTML = v;
		}
	}
}

function toggleas() {
	game.autosave = !game.autosave;
	save();
}