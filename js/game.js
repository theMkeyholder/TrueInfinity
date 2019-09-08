class Game {
	constructor() {
		this.time = 0;
		this.autosave = true;
		this.autosaveintv = 10;

		this.prestige = {};
		this.maxPrestigeLayer = '[0]';
	}
}

function ftl() {
	game.prestige['[0]'] = new PrestigeLayer('[0]', 0, 100, [new Generator(0, 0, 0, '[0]')], 0, 0);
}

class PrestigeLayer {
	constructor(loc, points = 0, power = 0, generators = [], tslp = 0, state = 0) {
		this.loc = loc;
		this.points = num(points);
		this.power = num(power);
		this.state = state;
		this.generators = generators;
		this.tslp = tslp;
	}

	update() {
		if (this.generators.length > 9) {
			this.state = 1;
		}

		if (this.state == 1) {
			while (this.generators.length > 3) {
				let removed = this.generators.splice(1, 1);
			}
		}

		if (this.generators[this.generators.length - 1].amount.gte(1)) {
			this.generators.push(new Generator(0, 0, this.generators[this.generators.length - 1].dim.add(1), this.loc));
		}

		this.tslp++;
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
			let y = new OmegaNum(this.tslp).div(20).mul(this.generators[1].dim).mul(this.generators[1].mult).mul(this.generators[1].amount);
			let z = this.generators[1].dim;
			let x = OmegaNum.choose(y, z).pow(0.4);
			if (x.lt(1e3)) {
				let w = y.factorial();
				this.incGen(0, w);
			} else {
				this.incGen(0, x);
			}
		}
	}

	updandgen() {
		this.update();
		this.generate();
	}

	maxAll() {
		for (let i in this.generators) {
			this.generators[i].buyMax();
		}

		let MSI = 9007199254740991;
		if (this.loc == '[0]') {
			let exp = this.power.log10();
			let fexp;
			if (exp.toNumber() > MSI) {
				fexp = exp;
			} else {
				fexp = new OmegaNum(Math.floor(exp.toNumber()));
			}
			if (this.state == 1 && this.generators[this.generators.length - 1].dim.lt(fexp.sub(1))) {
				this.generators.push(new Generator(1, 1, fexp.sub(1), this.loc));
				this.incPower(fexp.sub(1).neg());
			}

		} else {
			let exp = this.points.log10();
			let fexp;
			if (exp.toNumber > MSI) {
				fexp = exp;
			} else {
				fexp = new OmegaNum(Math.floor(exp.toNumber()));
			}
			if (this.points.gte(OmegaNum.pow(fexp.lt(98) ? 10 : fexp.div(5), this.generators[this.generators.length - 1].dim.add(2))) && this.state == 1) {
				this.generators.push(new Generator(1, 1, fexp, this.loc));
			}
		}
	}

	prestige() {
		let JSloc = JSON.parse(this.loc);
		JSloc[0]++;
		let newloc = JSON.stringify(JSloc);
		if (this.loc == game.maxPrestigeLayer) {
			game.maxPrestigeLayer = newloc;
			game.prestige[newloc] = new PrestigeLayer(newloc, (this.loc == '[0]' ? this.power : this.points).logBase(new OmegaNum(1.79e308)).floor().mul(10), 0, [new Generator(0, 0, 0, newloc)], 0, 0);
		} else {
			game.prestige[newloc].points = game.prestige[newloc].points.add((this.loc == '[0]' ? this.power : this.points).logBase(new OmegaNum(1.79e308)).floor().mul(10));
		}

		this.points = num(0);
		if (this.loc == '[0]') {
			this.power = num(100);
		} else {
			this.power = num(0);
		}
		this.generators = [new Generator(0, 0, 0, this.loc)];
		this.tslp = 0;
		this.state = 0;
	}
}

class Generator {
	constructor(amount, bought, dim, loc) {
		this.amount = num(amount);
		this.bought = num(bought);
		this.dim = num(dim);
		this.loc = loc;
		this.baseprice = OmegaNum.pow(10, this.dim.add(1));
	}

	get price() {
		return OmegaNum.pow(this.dim.lt(100) ? 10 : this.dim.div(5), OmegaNum.mul(this.bought.add(1), this.dim.add(1)))
	}

	get mult() {
		let mpl= game.maxPrestigeLayer;
		let arr = JSON.parse(mpl);
		let n = arr[0];
		let JSloc = JSON.parse(this.loc);
		let n2 = JSloc[0];
		let pow = new OmegaNum(1);
		while (n > n2) {
			let x = arr;
			x[0] = n;
			let jx = JSON.stringify(x);
			pow = pow.mul(game.prestige[jx].power.pow(new OmegaNum(n).sub(n2)).add(1));
			n--;
		}
		return OmegaNum.pow(2, this.bought).mul(pow);
	}

	get canAfford() {
		if (this.loc == '[0]') {
			return game.prestige[this.loc].power.gte(this.price);
		} else {
			return game.prestige[this.loc].points.gte(this.price);
		}
	}

	get maxAfford() {
		if (this.loc == '[0]') {
			if (!game.prestige[this.loc].power.lt(this.price)) {
				return OmegaNum.affordGeometricSeries(game.prestige[this.loc].power, this.baseprice, OmegaNum.pow(this.dim.lt(100) ? 10 : this.dim.div(5), this.dim.add(1)), this.bought);
			} else {
				return new OmegaNum(0);
			}
		} else {
			if (!game.prestige[this.loc].points.lt(this.price)) {
				return OmegaNum.affordGeometricSeries(game.prestige[this.loc].points, this.baseprice, OmegaNum.pow(this.dim.lt(100) ? 10 : this.dim.div(5), this.dim.add(1)), this.bought);
			} else {
				return new OmegaNum(0);
			}
		}
	}

	get costForMax() {
		return OmegaNum.sumGeometricSeries(this.maxAfford, this.baseprice, OmegaNum.pow(this.dim.lt(100) ? 10 : this.dim.div(5), this.dim.add(1)), this.bought);
	}

	buy() {
		if (this.canAfford) {
			if (this.loc == '[0]') {
				game.prestige[this.loc].incPower(this.price.neg());
			} else {
				game.prestige[this.loc].incPoints(this.price.neg());
			}
			this.amount = this.amount.add(1);
			this.bought = this.bought.add(1);
			return true;
		} else {
			return false;
		}
	}

	buyMax() {
		if (this.maxAfford.gt(0)) {
			let cfm = this.costForMax;
			this.amount = this.amount.add(this.maxAfford);
			this.bought = this.bought.add(this.maxAfford);
			if (this.loc == '[0]') {
				if (game.prestige[this.loc].power.lt('e9007199254740991')) {
					game.prestige[this.loc].incPower(cfm.neg());
				}
			} else {
				if (game.prestige[this.loc].points.lt('e9007199254740991')) {
					game.prestige[this.loc].incPoints(cfm.neg());
				}
			}
		}
	}
}
