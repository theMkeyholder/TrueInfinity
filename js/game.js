class Game {
	constructor(data, data_version) {
		this.prestige = {};
		
		if (data) {
			if (data.prestige) {
				for (let i in data.prestige) {
					this.prestige[i] = l(data.prestige[i]);
				}
			}
		}
		
		this.time = data ? (data.time || 0) : 0;		
	}
	
	update() {
		this.time++;
		for (let i in this.prestige) {
			this.prestige[i].update();
			if (!this.prestige[i].initiated) {
				this.prestige[i].init();
			}
		}
	}
}

class Layer {
	constructor(loc, points, power, dims, tslp) {
		this.loc = loc || [0];
		this.str_loc = JSON.stringify(this.loc);
		
		this.points = n(points || 0);
		this.power = n(power || 0);
		
		this.dims = dims ? dims.map(x => d(x)) : [new Dimension(0, loc)];
		
		this.tslp = tslp || 0;
		this.initiated = false;
	}
	
	init() {
		this.initiated = true;
		createLayer(this.loc);
	}
	
	incPoints(n) {
		this.points = OmegaNum.add(n, this.points);
	}
	
	incPower(n) {
		this.power = OmegaNum.add(n, this.power);
	}
	
	subPoints(n) {
		this.points = OmegaNum.sub(this.points, n);
	}
	
	update() {
		this.generate();
		
		if (this.dims[this.dims.length - 1].amount.gt(0)) {
			this.dims.push(new Dimension(this.dims[this.dims.length - 1].dim.add(1), this.loc));
		}
		
		if (this.dims[this.dims.length - 1].dim.gte(10) && this.dims.length > 3) {
			this.dims.splice(1, 1);
		}
		
		for (let i = 0; i < this.dims.length; i++) {
			if (document.getElementById('b' + this.str_loc + JSON.stringify(this.dims[i].dim.array))) {
				document.getElementById('b' + this.str_loc + JSON.stringify(this.dims[i].dim.array)).onclick = () => game.prestige[this.str_loc].dims[i].buy();
				document.getElementById('b2' + this.str_loc + JSON.stringify(this.dims[i].dim.array)).onclick = () => game.prestige[this.str_loc].dims[i].buyMax();
			}
		}
		
		this.tslp++;
	}
	
	generate() {
		for (let d of this.dims) {
			let p = d.mult.mul(d.amount).div(20);
			let dm = d.dim;
			if (dm.eq(0)) {
				this.str_loc == '[0]' ? this.incPoints(p) : this.incPower(p);
			} else {
				if (this.dims[this.dims.length - 1].dim.lt(10)) {
					this.dims[d.dim.sub(1).toNumber()].amount = this.dims[d.dim.sub(1).toNumber()].amount.add(p);
				} else {
					this.dims[0].amount = this.dims[0].amount.add(secretFormula(this.tslp, dm, this.dims[1].amount, this.dims[1].mult));
				}
			}
		}
	}
}

class Dimension {
	constructor(dim, loc, amount, bought) {
		this.dim = n(dim || 0);
		
		this.loc = loc || [0];
		this.str_loc = JSON.stringify(this.loc);
		
		this.amount = n(amount || 0);
		this.bought = n(bought || 0);
		
		this.price_start = OmegaNum.pow(10, this.dim.add(1));
	}
	
	get mult() {
		return OmegaNum.pow(2, this.bought.add(0));
	}
	
	get price() {
		return OmegaNum.pow(this.dim.lt(100) ? 10 : this.dim.div(5).floor(), this.dim.add(1).mul(this.bought.add(1)));
	}
	
	get afford() {
		return game.prestige[this.str_loc].points.gte(this.price);
	}
	
	buy() {
		if (this.afford) {
			let pc = this.price;
			this.amount = this.amount.add(1);
			this.bought = this.bought.add(1);
			
			game.prestige[this.str_loc].subPoints(pc);
			
			return true;
		} else {
			return false;
		}
	}
	
	get max_afford() {
		return OmegaNum.affordGeometricSeries(game.prestige[this.str_loc].points, this.price_start, OmegaNum.pow(this.dim.lt(100) ? 10 : this.dim.div(5).floor(), this.dim.add(1)), this.bought);
	}
	
	get max_price() {
		return OmegaNum.sumGeometricSeries(this.max_afford, this.price_start, OmegaNum.pow(this.dim.lt(100) ? 10 : this.dim.div(5).floor(), this.dim.add(1)), this.bought);
	}
	
	buyMax() {
		if (this.afford) {
			let ma = this.max_afford;
			let mp = this.max_price;
			
			this.amount = this.amount.add(ma);
			this.bought = this.bought.add(ma);
			
			game.prestige[this.str_loc].subPoints(mp);
			
			return true;
		} else {
			return false;
		}
	}
}