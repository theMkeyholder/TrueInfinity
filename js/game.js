class Game {
	constructor(data) {
		this.resources = [];
		this.generators = [];

		if (data) {
			if (data.resources) {
				for (let i in data.resources) {
					this.resources[i] = data.resources[i];
				}
			}

			if (data.generators) {
				for (let i in data.generators) {
					this.generators[i] = data.generators[i];
				}
			}
		}
	}
}

class Resource {
	constructor(loc, amount) {
		// Location is [prestige layer, meta-prestige layer, meta-meta-prestige layer...]
		this.rawloc = loc.slice(0);
		this.loc = loc;
		for (let i = 0; i < this.loc.length; i++) {
			this.loc[i] = new OmegaNum(this.loc[i]);
		}

		if (amount) {
			this.amount = amount;
		} else {
			this.amount = new OmegaNum(0);
		}
	}

	increment(n) {
		this.amount = this.amount.add(n);
	}

	decrement(n) {
		this.amount = this.amount.sub(n);
	}
}

class Generator {
	constructor(loc, amount, bought, mult) {
		// Location is [dimension number, prestige layer, meta-prestige layer, meta-meta-prestige layer...]
		this.rawloc = loc.slice(0);
		this.loc = loc;
		for (let i of this.loc) {
			this.loc[i] = new OmegaNum(this.loc[i]);
		}

		if (amount) {
			this.amount = amount;
		} else {
			this.amount = new OmegaNum(0);
		}

		if (bought) {
			this.bought = bought;
		} else {
			this.bought = new OmegaNum(0);
		}

		if (mult) {
			this.mult = mult;
		} else {
			this.mult = new OmegaNum(1);
		}
	}

	increment(n) {
		this.amount = this.amount.add(n);
	}

	produce() {
		if (this.loc[0].eq(new OmegaNum(0))) {
			let array = this.loc.splice(1);
			game.resources[array].increment(this.mult);
		} else {
			let array = this.loc;
			array[0] = array[0].sub(1);
			game.generators[array].increment(this.mult);
		}
	}
}
