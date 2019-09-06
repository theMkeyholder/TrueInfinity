class Game {
	constructor() {
		this.time = 0;
		this.autosave = true;
		this.autosaveintv = 10;

		this.prestige = {};
	}
}

function ftl() {
	game.prestige['[0]'] = new PrestigeLayer('[0]', 0, 4, [new Generator(0, 0, 0, '[0]')], 0, 0);
}

class PrestigeLayer {
	constructor(loc, points = 0, power = 0, generators = [], tslmd = 0, state = 0) {
		this.loc = loc;
		this.points = num(points);
		this.power = num(power);
		this.state = state;
		this.generators = generators;
		this.tslmd = tslmd;
	}

	update() {
		if (this.generators.length > 9) {
			this.state = 1;
		}

		if (this.state == 1) {
			while (this.generators.length > 2) {
				let removed = this.generators.splice(1, 1);
				this.tslmd = 0;
			}
		}
		this.tslmd++;
	}

	incPoints(q) {
		this.points = this.points.add(q);
	}

	incPower(q) {
		this.power = this.power.add(q);
	}

	incGen(dim, q) {
		this.generators[dim].amount = this.generators[dim].amount.add(q);
	}

	generate() {
		if (this.state == 0) {
			for (let i in this.generators) {
				if (i == 0) {
					this.incPower(this.generators[i].amount.mul(this.generators[i].mult).div(20));
				} else {
					this.incGen(i - 1, this.generators[i].amount.mul(this.generators[i].mult).div(20));
				}
			}
		} else {
			this.incPower(this.generators[0].amount.mul(this.generators[0].mult).div(20));
			let x = OmegaNum.choose(new OmegaNum(this.tslmd).mul(0.05).mul(this.generators[1].dim.sub(1).pow(2)).mul(this.generators[1].mult).mul(this.generators[1].amount).add(this.generators[1].dim), this.generators[1].dim - 1);
			this.incGen(0, x);
		}
	}

	updandgen() {
		this.update();
		this.generate();
	}
}

class Generator {
	constructor(amount, bought, dim, loc) {
		this.amount = num(amount);
		this.bought = num(bought);
		this.dim = num(dim);
		this.loc = loc;
		this.baseprice = OmegaNum.pow(4, OmegaNum.mul(1, this.dim.add(1)));
	}

	get price() {
		return OmegaNum.pow(4, OmegaNum.mul(this.bought.add(1), this.dim.add(1)));
	}

	get mult() {
		return OmegaNum.pow(2, this.bought);
	}

	get canAfford() {
		if (this.loc = '[0]') {
			return game.prestige[this.loc].power.gte(this.price);
		} else {
			return game.prestige[this.loc].points.gte(this.price);
		}
	}

	get maxAfford() {
		if (this.loc = '[0]') {
			return OmegaNum.affordGeometricSeries(game.prestige[this.loc].power, this.baseprice, new OmegaNum(4), this.bought);
		} else {
			return OmegaNum.affordGeometricSeries(game.prestige[this.loc].points, this.baseprice, new OmegaNum(4), this.bought);
		}
	}

	get costForMax() {
		return OmegaNum.sumGeometricSeries(this.maxAfford, this.baseprice, new OmegaNum(4), this.bought);
	}

	buy() {
		if (this.canAfford) {
			if (this.loc = '[0]') {
				game.prestige[this.loc].power = game.prestige[this.loc].power.sub(this.price);
			} else {
				game.prestige[this.loc].points = game.prestige[this.loc].points.sub(this.price);
			}
			this.amount = this.amount.add(1);
			this.bought = this.bought.add(1);
			return true;
		} else {
			return false;
		}
	}

	buyMax() {
		let cfm = this.costForMax
		this.amount = this.amount.add(this.maxAfford);
		this.bought = this.bought.add(this.maxAfford);
		if (this.loc = '[0]') {
			game.prestige[this.loc].power = game.prestige[this.loc].power.sub(cfm);
		} else {
			game.prestige[this.loc].points = game.prestige[this.loc].points.sub(cfm);
		}
	}
}
