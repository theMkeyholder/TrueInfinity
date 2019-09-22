function setElems() {
	for (let p2 in game.prestige) {
		let p = game.prestige[p2];
		if (p.str_loc != '[0]') {
			setElem('r' + JSON.stringify(p.loc), `
				You have ${f(p.points)} ${getLayerName(p.loc)} points and ${f(p.power)} ${getLayerName(p.loc)} power
			`);
		} else {
			setElem('r' + JSON.stringify(p.loc), `
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
	
	// Statistics
	
	setElem('stats', `
		You have ${f(game.prestige['[0]'].points)} antimatter<br>
		Your best prestige layer is ${JSON.stringify(game.max_layer) == '[0]' ? '...oh, you haven\'t prestiged yet' : getLayerName(game.max_layer)}<br>
		You have spent ${game.disp_time} in game
	`);
}
