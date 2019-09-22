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
	return new Layer(obj.loc, obj.points, obj.power, obj.dims, obj.tslp);
}

function secretFormula(tslp, dim, amount, mult) {
	let x = new OmegaNum(tslp).div(20).mul(dim).mul(mult).mul(amount).floor();
	let y = dim.floor();
	let z = OmegaNum.choose(x, y).pow(0.5);
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

const THRESHOLD = OmegaNum(1.79e308);

function getPrestigeGain(num) {
  num = num.max(1e3);
  let steps = num.logBase(THRESHOLD) - 1;
  let gens = num.log10().logBase(2);
  let pow = 4 * steps / gens;
  return OmegaNum.floor(OmegaNum.pow(10, pow));
}

function prestige(loc) {
	let str_loc = JSON.stringify(loc);
	let next_loc = JSON.parse(str_loc);
	next_loc[0]++;
	let next_str_loc = JSON.stringify(next_loc);
	let gain = getPrestigeGain(game.prestige[str_loc].points).mul(10);
	if (!gain.eq(0)) {
		if (game.prestige[next_str_loc]) {
			game.prestige[next_str_loc].incPoints(gain);
		} else {
			game.prestige[next_str_loc] = new Layer(next_loc, gain);
		}
		for (let i = loc[0]; i >= 0; i--) {
			let temp = [...loc];
			temp[0] = i;
			let temp2 = JSON.stringify(temp);
			game.prestige[temp2].clear();
		}
		if (cmpLayer(game.max_layer, next_loc) == -1) {
			game.max_layer = next_loc;
		}
	}
}

function cmpLayer(loc1, loc2) {
	if (loc1.length > loc2.length) return 1;
	if (loc1.length < loc2.length) return -1;
	for (let i = loc1.length - 1; i >= 0; i--) {
		if (loc1[i] > loc2[i]) {
			return 1;
			break;
		}
		if (loc1[i] < loc2[i]) {
			return -1;
			break;
		}
	}
	return 0;
}

function getMult(loc) {
	let x = n(1);
	for (let i = loc[0] + 1; i < game.max_layer[0] + 1; i++) {
		let temp = [...loc];
		temp[0] = i;
		let temp2 = JSON.stringify(temp);
		if (!game.prestige[temp2].power.eq(0)) {
			x = x.mul(game.prestige[temp2].power.pow(i - loc[0]));
		}
	}
	return x.eq(0) ? x.add(1) : x;
}

const NAMES = [
	'infinity',
	'eternity',
	'reality',
	'equality',
	'affinity',
	'celerity',
	'identity',
	'vitality',
	'immunity',
	'atrocity',
	'immensity',
	'severity',
	'fatality',
	'insanity',
	'calamity',
	'futility',
	'finality',
	'unity'
];

function getLayerName(loc) {
	let str = '';
	if (loc.length = 1) {
		if (JSON.stringify(loc) != '[0]') {
			let floor = Math.floor(loc[0] / NAMES.length);
			if (floor != 0) {
				if (floor == 1) {
					str += 'meta-';
				} else {
					str += 'meta<sup>';
					str += floor;
					str += '</sup>-';
				}
			}
			let name = NAMES[(loc[0] - 1) % NAMES.length];
			str += name;
		}
	}
	return str;
}
