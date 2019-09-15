function n(num) {
	return new OmegaNum(num.array ? num.array : num);
}

function d(str) {
	let obj;
	if (typeof str == 'string') {
		obj = JSON.parse(str);
	} else {
		obj = str;
	}
	return new Dimension(obj.dim, obj.loc, obj.amount, obj.bought);
}

function l(str) {
	let obj;
	if (typeof str == 'string') {
		obj = JSON.parse(str);
	} else {
		obj = str;
	}
	return new Layer(obj.loc, obj.points, obj.power, obj.dims);
}

function secretFormula(tslp, dim, amount, mult) {
	let x = new OmegaNum(tslp).div(20).mul(dim).mul(mult).mul(amount);
	let y = dim;
	let z = OmegaNum.choose(x, y).pow(0.6);
	return z.gt(1e3) ? z : y.factorial();
}

function createDiv(parentId, thisId, classes = '') {
	return createElem(parentId, thisId, 'div', classes);
}

function createElem(parentId, thisId, type, classes = '') {
	let elem = document.createElement(type);
	elem.id = thisId;
	elem.className = classes;
	document.getElementById(parentId).appendChild(elem);
	return elem;
}

function removeElem(thisId) {
	document.getElementById(thisId).remove();
}

function toggleSB() {
	document.getElementById('sidebar').classList.toggle('expanded');
	document.getElementById('toggleSB').innerHTML = document.getElementById('toggleSB').innerHTML == '&gt;&gt;' ? '&lt;&lt;' : '&gt;&gt;';
	if (document.getElementById('mt0').innerHTML == 'D') {
		setTimeout(() => document.getElementById('mt0').innerHTML = 'Dimensions', 300);
	} else {
		setTimeout(() => document.getElementById('mt0').innerHTML = 'D', 200);
	}
	if (document.getElementById('mt1').innerHTML == 'O') {
		setTimeout(() => document.getElementById('mt1').innerHTML = 'Options', 300);
	} else {
		setTimeout(() => document.getElementById('mt1').innerHTML = 'O', 200);
	}
	if (document.getElementById('mt2').innerHTML == 'S') {
		setTimeout(() => document.getElementById('mt2').innerHTML = 'Statistics', 300);
	} else {
		setTimeout(() => document.getElementById('mt2').innerHTML = 'S', 200);
	}
	if (document.getElementById('mt3').innerHTML == 'A') {
		setTimeout(() => document.getElementById('mt3').innerHTML = 'Achievements', 300);
	} else {
		setTimeout(() => document.getElementById('mt3').innerHTML = 'A', 200);
	}
}

function mt(n) {
	let nl = document.querySelectorAll('.maintab');
	for (let i = 0; i < nl.length; i++) {
		let nd = nl[i];
		nd.style.display = 'none';
	}
	document.querySelector('#mtb' + n).style.display = 'block';
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