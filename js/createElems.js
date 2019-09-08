function createPrestige(loc) {
	let p = createDiv('lw', 'p' + loc);
	p.className = 'prestige';
	
	let rb = createDiv('p' + loc, 'rb' + loc);
	rb.className = 'resBox';
	let r = createDiv('rb' + loc, 'r' + loc);
	r.className = 'r';
	
	let b = createElem('p' + loc, 'b' + loc, 'BUTTON');
	b.className = 'sbb green maxall';
	b.innerHTML = 'Max All';
	b.onclick = function() {game.prestige[loc].maxAll()};
	
	let b2 = createElem('rb' + loc, 'b2' + loc, 'BUTTON');
	b2.className = 'sbb blue maxall';
	b2.innerHTML = 'Prestige';
	b2.onclick = function() {game.prestige[loc].prestige()};
	
	let gb = createDiv('p' + loc, 'gb' + loc); 
	gb.className = 'genBox';
}

function updatePrestiges() {
	let ps = document.querySelectorAll('.prestige');
	for (let i = 0; i < ps.length; i++) {
		let p = ps[i]
		let id = p.id;
		let loc = id.replace('p', '');
		if (typeof game.prestige[loc] == 'undefined') {
			removeDiv(id);
		}
	}
	for (let i in game.prestige) {
		let loc = game.prestige[i].loc;
		if (document.getElementById('p' + loc) == null) {
			createPrestige(loc);
		}
		for (let j in game.prestige[i].generators) {
			let dim = game.prestige[i].generators[j].dim.toString();
			if (document.getElementById('gen' + dim + loc) == null) {
				if (document.getElementById('gb' + loc) != null) {
					let gen = createDiv('gb' + loc, 'gen' + dim + loc);
					gen.className = 'gen';
				}
			}
		}
		let loc2 = loc.slice(1, 2);
		let gens = document.querySelectorAll('#gb\\[' + loc2 + '\\] .gen');
		for (let j = 0; j < gens.length; j++) {
			let n = gens[j];
			let id = n.id;
			let dim = id.replace('gen', '').replace(loc, '');
			let del = true;
			for (let k of game.prestige[i].generators) {
				if (k.dim.toString() == dim) {
					del = false;
					break;
				}
			}
			if (del) {
				removeDiv(id);
			}
		}
	}
}

function createDiv(parentId, thisId) {
	let div = document.createElement('DIV');
	div.id = thisId;
	document.getElementById(parentId).appendChild(div);
	return div;
}

function createElem(parentId, thisId, type) {
	let elem = document.createElement(type);
	elem.id = thisId
	document.getElementById(parentId).appendChild(elem);
	return elem;
}

function removeDiv(thisId) {
	document.getElementById(thisId).remove();
}