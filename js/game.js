class Game {
	constructor() {
		this.resources = {};
		this.generators = {};
	}
	
	init(data) {
		newResource(0, [0]);
		newGenerator(0, [0]);
		
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

// Resource [type, location, amount]
// Generator [dim, location, amount, bought, production]
// Location [array (may be nested if I develop that far)]

function newResource(type = 1, loc, amount = 0) {
	let array = [];
	array[0] = type;
	array[1] = loc;
	array[2] = new OmegaNum(amount);
	game.resources[JSON.stringify(loc)] = array;
	return array;
}

function newGenerator(dim, loc, amount = 0, bought = 0, prod = 1) {
	let array = [];
	array[0] = dim;
	array[1] = loc;
	array[2] = new OmegaNum(amount);
	array[3] = new OmegaNum(bought);
	array[4] = new OmegaNum(prod);
	game.generators[JSON.stringify(loc)] = array;
	return array;
}