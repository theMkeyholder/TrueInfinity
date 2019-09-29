function setElems() {
	for (let p2 in game.prestige) {
		let p = game.prestige[p2];
		if (p.str_loc != '[0]') {
			setElem('r' + JSON.stringify(p.loc), `
				You have ${f(p.points)} ${getLayerName(p.loc)} points and ${f(p.power)} ${getLayerName(p.loc)} power
			`);
			setElem('r2' + JSON.stringify(p.loc), `
				You have ${f(p.points)} ${getLayerName(p.loc)} points and ${f(p.power)} ${getLayerName(p.loc)} power
			`);
		} else {
			setElem('r' + JSON.stringify(p.loc), `
				You have ${f(p.points)} antimatter
			`);
			setElem('r2' + JSON.stringify(p.loc), `
				You have ${f(p.points)} antimatter
			`);
		}
		if (p.points.gt(1.79e308)) {
			setdisp('pb' + JSON.stringify(p.loc), 'inline-block');
		} else {
			hide('pb' + JSON.stringify(p.loc));
		}
		setElem('pb' + JSON.stringify(p.loc), `
			Prestige for: ${f(getPrestigeGain(p.points).mul(10))} ${getLayerName(p.next_loc)} points
		`);
		for (let g of p.dims) {
			if (p.str_loc != '[0]') {
				setElem('t' + JSON.stringify(g.loc) + JSON.stringify(g.id), `
					${getLayerName([g.loc]).replace(/(^|[\s-])\S/g, function (match) {return match.toUpperCase()})} Dimension ${f(g.dim.add(1))}<br>
					${f(g.amount)} x${f(g.mult)}<br>
					Cost: ${f(g.price)}
				`);
			} else {
				setElem('t' + JSON.stringify(g.loc) + JSON.stringify(g.id), `
				Dimension ${f(g.dim.add(1))}<br>
				${f(g.amount)} x${f(g.mult)}<br>
				Cost: ${f(g.price)}
			`);
			}
		}
	}

	// Autosave Stuff
	if (game.as) {
		document.getElementById('as').className = document.getElementById('as').className.replace('red', 'green');
		game.asintv = document.getElementById('asintv').value;
		show('asintvp');
	} else {
		document.getElementById('as').className = document.getElementById('as').className.replace('green', 'red');
		hide('asintvp');
	}

	// Statistics

	setElem('stats', `
		You have ${f(game.prestige['[0]'].points)} antimatter<br>
		Your best prestige layer is ${JSON.stringify(game.max_layer) == '[0]' ? '...oh, you haven\'t prestiged yet' : getLayerName(game.max_layer)}<br>
		You have spent ${game.disp_time} in game
	`);

	// Automation Unlock
	if (game.celerity_unlocked) {
		show('autodiv');
		hide('autolock');

		show('mt4');
		hide('mt4alt');
	} else {
		hide('autodiv');
		setdisp('autolock', 'inline-block');

		hide('mt4');
		setdisp('mt4alt', 'inline-block');
	}

	for (let p2 in game.prestige) {
		let p = game.prestige[p2];
		setElem('ama' + JSON.stringify(p.loc), `
			Unlock Auto Max All<br>
			Cost: ${f(auto_max_cost(p.loc))} ${JSON.stringify(p.loc) == '[0]' ? 'Antimatter' : getLayerName(p.loc).replace(/(^|[\s-])\S/g, function (match) {return match.toUpperCase()}) + ' Points'}
		`);
		if (p.is_auto_max) {
			document.getElementById('ama' + JSON.stringify(p.loc)).className = document.getElementById('ama' + JSON.stringify(p.loc)).className.replace('red', 'blue').replace('green', 'blue');
		} else {
			if (afford_auto_max(p.loc)) {
				document.getElementById('ama' + JSON.stringify(p.loc)).className = document.getElementById('ama' + JSON.stringify(p.loc)).className.replace('red', 'green');
			} else {
				document.getElementById('ama' + JSON.stringify(p.loc)).className = document.getElementById('ama' + JSON.stringify(p.loc)).className.replace('green', 'red');
			}
		}

		setElem('ap' + JSON.stringify(p.loc), `
			Unlock Auto Prestige Gain<br>
			Cost: ${f(auto_prestige_cost(p.loc))} ${JSON.stringify(p.loc) == '[0]' ? 'Antimatter' : getLayerName(p.loc).replace(/(^|[\s-])\S/g, function (match) {return match.toUpperCase()}) + ' Points'}
		`);
		if (p.is_auto_prestige) {
			document.getElementById('ap' + JSON.stringify(p.loc)).className = document.getElementById('ap' + JSON.stringify(p.loc)).className.replace('red', 'blue').replace('green', 'blue');
		} else {
			if (afford_auto_prestige(p.loc)) {
				document.getElementById('ap' + JSON.stringify(p.loc)).className = document.getElementById('ap' + JSON.stringify(p.loc)).className.replace('red', 'green');
			} else {
				document.getElementById('ap' + JSON.stringify(p.loc)).className = document.getElementById('ap' + JSON.stringify(p.loc)).className.replace('green', 'red');
			}
		}
	}
}
