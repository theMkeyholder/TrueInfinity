function loadSave(data) {
	game.time = data.time || 0;
	if (typeof data.autosave == 'boolean') {
		game.autosave = data.autosave;
	} else {
		game.autosave = true;
	}
	game.autosaveintv = data.autosaveintv || 10;
	
	if (data.prestige) {
		for (let pn in data.prestige) {
			let p = data.prestige[pn];
			let gens = []
			for (let g of p.generators) {
				gens.push(new Generator(num(g.amount), num(g.bought), num(g.dim), g.loc));
			}
			game.prestige[p.loc] = new PrestigeLayer(p.loc, num(p.points), num(p.power), gens, p.tslmd, p.state);
		}
	}
}