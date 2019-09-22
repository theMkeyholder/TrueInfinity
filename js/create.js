function createLayer(loc) {
	let p = createDiv('layerswrapper', 'p' + JSON.stringify(loc), 'p');
	let r = createResBox(loc);
	let m = createElem('p' + JSON.stringify(loc), 'm' + JSON.stringify(loc), 'button', 'maxall sbb green');
	m.innerHTML = 'Max All';
	m.onclick = () => {game.prestige[JSON.stringify(loc)].maxAll()};
	let br = createElem('p' + JSON.stringify(loc), '', 'br');
	let pb = createElem('p' + JSON.stringify(loc), 'pb' + JSON.stringify(loc), 'button', 'pb sbb blue');
	pb.innerHTML = 'Prestige for: ';
	pb.onclick = () => {prestige(loc)};
}

function createResBox(loc) {
	let r = createDiv('p' + JSON.stringify(loc), 'r' + JSON.stringify(loc), 'r');
	return r;
}

function createGenerator(dim, loc, index) {
	let d = n(dim);
	let o = game.prestige[JSON.stringify(loc)].dims[index];
	
	let g = createDiv('p' + JSON.stringify(loc), 'g' + JSON.stringify(loc) + JSON.stringify(o.id), 'g');
	
	let t = createElem('g' + JSON.stringify(loc) + JSON.stringify(o.id), 't' + JSON.stringify(loc) + JSON.stringify(o.id), 'p', 'gt');
	
	let b = createElem('g' + JSON.stringify(loc) + JSON.stringify(o.id), 'b' + JSON.stringify(loc) + JSON.stringify(o.id), 'button', 'gb sbb green height half');
	b.innerHTML = 'Buy';
	let b2 = createElem('g' + JSON.stringify(loc) + JSON.stringify(o.id), 'b2' + JSON.stringify(loc) + JSON.stringify(o.id), 'button', 'gb sbb green height half');
	b2.innerHTML = 'Buy Max';
	hide(b.id);
	hide(b2.id);
	
	let h = createElem('g' + JSON.stringify(loc) + JSON.stringify(o.id), 'h' + JSON.stringify(loc) + JSON.stringify(o.id), 'hr');
	
	setTimeout(function() {
		setdisp('b' + JSON.stringify(loc) + JSON.stringify(o.id), 'inline-block');
		setdisp('b2' + JSON.stringify(loc) + JSON.stringify(o.id), 'inline-block');
	}, 50);
	
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
			let dim = j.id
			if (document.getElementById('g' + loc + dim) == null) {
				createGenerator(dim, rloc, game.prestige[i].dims.indexOf(j));
			}
			if (j.afford) {
				document.getElementById('b' + loc + dim).className = document.getElementById('b' + loc + dim).className.replace('red', 'green');
				document.getElementById('b2' + loc + dim).className = document.getElementById('b2' + loc + dim).className.replace('red', 'green');
			} else { 
				document.getElementById('b' + loc + dim).className = document.getElementById('b' + loc + dim).className.replace('green', 'red');
				document.getElementById('b2' + loc + dim).className = document.getElementById('b2' + loc + dim).className.replace('green', 'red');
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
				if (JSON.stringify(k.id) == dim) {
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