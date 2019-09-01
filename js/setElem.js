function setElems() {
	if (document.querySelector('#sidebar:hover') !== null) {
		if (sbht < 20) {
			sbht++;
		}
	} else {
		if (sbht > 0) {
			sbht--;
		}
	}
	
	if (sbht > 10) {
		setElem('antimattersidebar', `<small>You have </small><big>${game.resources['[0]'][2].toString()}</big><small> antimatter</small>`);
	} else {
		setElem('antimattersidebar', `<big>${game.resources['[0]'][2].toString()}</big>`);
	}
	
	for (let r in game.resources) {
		setElem('res' + JSON.stringify(game.resources[r].loc), 'MEOW');
	}
}

function setElem(id, v) {
	if (document.getElementById(id)) {
		if (document.getElementById(id).innerHTML != v) {
			document.getElementById(id).innerHTML = v;
		}
	}
}