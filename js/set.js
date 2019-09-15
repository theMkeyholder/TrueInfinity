function setElems() {
	for (let p2 in game.prestige) {
		let p = game.prestige[p2];
		setElem('r' + JSON.stringify(p.loc), `
			You have ${f(p.points)} points and ${f(p.power)} power
		`);
		for (let g of p.dims) {
			setElem('t' + JSON.stringify(g.loc) + JSON.stringify(g.dim.array), `
				Dimension ${f(g.dim)}<br>
				${f(g.amount)} x${f(g.mult)}<br>
				Cost: ${f(g.price)}
			`);
		}
	}
}