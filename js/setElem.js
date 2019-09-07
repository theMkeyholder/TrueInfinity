function setElems() {
	// Sidebar
	if (document.querySelector('#sidebar:hover') !== null) {
		if (sbht < 20) {
			sbht++;
		}
		if (sbht > 15) {
			setElem('antimattersidebar', `<small>you have </small><big>${d(game.prestige['[0]'].power)}</big><small> antimatter</small>`);
		} else {
			setElem('antimattersidebar', `<big>${d(game.prestige['[0]'].power)}<big>`);
		}
	} else {
		if (sbht > 0) {
			sbht--;
		}
		if (sbht < 15) {
			setElem('antimattersidebar', `<big>${d(game.prestige['[0]'].power)}<big>`);
		} else {
			setElem('antimattersidebar', `<small>you have </small><big>${d(game.prestige['[0]'].power)}</big><small> antimatter</small>`);
		}
	}

	// Main Tab
	for (let i in game.prestige) {
		if (i == '[0]') {
			setElem('r' + i, `You have ${d(game.prestige[i].power)} antimatter`);
		} else {
			setElem('r' + i, `You have ${d(game.prestige[i].power)} power`);
		}
		for (let k in game.prestige[i].generators) {
			let j = game.prestige[i].generators[k];
			let l = JSON.stringify(i);
			let id = 'gen' + j.dim + game.prestige[i].loc;
			setElem(id, `
				Dimension ${d(j.dim.add(1))}
				<br>
				${d(j.amount)} &nbsp x${d(j.mult)}
				<br>
				Cost: ${d(j.price)}
				<br>
				<button class='sbb green nochange half' onmousedown='game.prestige[${l}].generators[${k}].buy()'>Buy 1</button><button class='sbb green nochange half' onmousedown='game.prestige[${l}].generators[${k}].buyMax()'>Buy Max</button>
				<hr>
			`);
			if (document.getElementById(id)) {
				document.getElementById(id).style.visibility = 'visible';
			}
		}
	}

	// Options Tab
	if (game.autosave) {
		setElem('asbutton', 'Autosave: Enabled');
		asbutton.className = 'sbb blue';
		show('asp');
	} else {
		setElem('asbutton', 'Autosave: Disabled');
		asbutton.className = 'sbb grey';
		hide('asp');
	}
}
