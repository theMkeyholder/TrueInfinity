function setElems() {
	// Sidebar
	if (document.querySelector('#sidebar:hover') !== null) {
		if (sbht < 20) {
			sbht++;
		}
		setElem('antimattersidebar', `<small>you have </small><big>${game.prestige['[0]'].power.toString()}</big><small> antimatter</small>`);
	} else {
		if (sbht > 0) {
			sbht--;
		}
		setElem('antimattersidebar', `<big>${game.prestige['[0]'].power.toString()}<big>`);
	}
	
	// Main Tab
	for (let i in game.prestige) {
		if (i == '[0]') {
			setElem('r' + i, `You have ${game.prestige[i].power.toString()} antimatter`);
		} else {
			setElem('r' + i, `You have ${game.prestige[i].power.toString()} power`);
		}
		
		for (let k in game.prestige[i].generators) {
			let j = game.prestige[i].generators[k];
			let l = JSON.stringify(i);
			let id = 'gen' + j.dim + game.prestige[i].loc;
			setElem(id, `
				${j.amount.toString()} &nbsp x${j.mult.toString()}
				<br>
				Cost: ${j.price.toString()}
				<br>
				<button class='sbb green nochange half' onmousedown='game.prestige[${l}].generators[${k}].buy()'>Buy 1</button><button class='sbb green nochange half' onmousedown='game.prestige[${l}].generators[${k}].buyMax()'>Buy Max</button>
			`);
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