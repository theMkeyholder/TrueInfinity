function setElems() {
	for (let r in game.resources) {
		setElem('res' + game.resources[r].rawloc, 'MEOW');
	}
}

function setElem(id, v) {
	if (document.getElementById(id).innerHTML != v) {
		document.getElementById(id).innerHTML = v;
	}
}