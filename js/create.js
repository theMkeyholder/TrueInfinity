function createLayer(loc) {
	let p = createDiv('layerswrapper', 'p' + JSON.stringify(loc), 'p');
	let r = createResBox(loc);
	for (let i of game.prestige[JSON.stringify(loc)].dims) {
		createGenerator(i.dim, loc, game.prestige[JSON.stringify(loc)].dims.indexOf(i));
	}
}

function createResBox(loc) {
	let r = createDiv('p' + JSON.stringify(loc), 'r' + JSON.stringify(loc), 'r');
	return r;
}

function createGenerator(dim, loc, index) {
	let d = n(dim);
	
	let g = createDiv('p' + JSON.stringify(loc), 'g' + JSON.stringify(loc) + JSON.stringify(d.array), 'g');
	
	let t = createElem('g' + JSON.stringify(loc) + JSON.stringify(d.array), 't' + JSON.stringify(loc) + JSON.stringify(d.array), 'p', 'gt');
	
	let b = createElem('g' + JSON.stringify(loc) + JSON.stringify(d.array), 'b' + JSON.stringify(loc) + JSON.stringify(d.array), 'button', 'gb sbb green height half');
	b.innerHTML = 'Buy';
	let b2 = createElem('g' + JSON.stringify(loc) + JSON.stringify(d.array), 'b2' + JSON.stringify(loc) + JSON.stringify(d.array), 'button', 'gb sbb green height half');
	b2.innerHTML = 'Buy Max';
	
	return g;
}

function updatePrestiges() {
	let ps = document.querySelectorAll('.p');
	for (let i = 0; i < ps.length; i++) {
		let p = ps[i]
		let id = p.id;
		let loc = id.replace('p', '');
		let rloc = JSON.parse(loc);
		if (typeof game.prestige[loc] == 'undefined') {
			removeDiv(id);
		}
	}
	for (let i in game.prestige) {
		let loc = JSON.stringify(game.prestige[i].loc);
		let rloc = JSON.parse(loc);
		if (document.getElementById('p' + loc) == null) {
			createLayer(rloc);
		}
		for (let j of game.prestige[i].dims) {
			let dim = JSON.stringify(j.dim.array);
			let rdim = j.dim.array;
			if (document.getElementById('g' + loc + dim) == null) {
				createGenerator(rdim, rloc, game.prestige[i].dims.indexOf(j));
			}
		}
		let loc2 = loc.replace(']', '')
		let gens = document.querySelectorAll('#p\\' + loc2 + '\\] .g');
		for (let j = 0; j < gens.length; j++) {
			let n = gens[j];
			let id = n.id;
			let dim = id.replace('g', '').replace(loc, '');
			let del = true;
			for (let k of game.prestige[i].dims) {
				if (JSON.stringify(k.dim.array) == dim) {
					del = false;
					break;
				}
			}
			if (del) {
				removeElem(id);
			}
		}
	}
}

function clearAll() {
	let node = document.querySelector('#layerswrapper');
	while (node.hasChildNodes()) {
		node.removeChild(node.lastChild);
	}
}