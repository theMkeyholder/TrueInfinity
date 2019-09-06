function createPrestige(loc) {
	let p = createDiv('lw', 'p' + loc);
	p.className = 'prestige';
	
	let rb = createDiv('p' + loc, 'rb' + loc);
	rb.className = 'resBox';
	let r = createDiv('rb' + loc, 'r' + loc);
	r.className = 'r';
	
	let gb = createDiv('p' + loc, 'gb' + loc); 
	gb.className = 'genBox';
}

function updatePrestiges() {
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

function removeDiv(thisId) {
	document.getElementById(thisId).remove();
}