// Chuck your data into the depths of the localStorage variable...
function save() {
	localStorage.setItem('save', btoa(JSON.stringify(game)));
	if (game.as) {
		setTimeout(save, game.asintv);
	}
}

// Clear the save file
function wipe() {
	if (confirm('Do you want to delete ALL of your progress?!?')) {
		clearAll();
		game = new Game();
		firstTime();
		save();
	}
}

// Retrieve your data from the depths of the localStorage variable...
function load() {
	if (localStorage.getItem('save') != undefined && localStorage.getItem('save') != 'undefined' && localStorage.getItem('save') != null) {
		clearAll();
		try {
			game = new Game(JSON.parse(atob(localStorage.getItem('save'))));
		} catch(e) {
			console.warn('Outdated save, updating');
			game = new Game(JSON.parse(localStorage.getItem('save')));
		}
		save();
		return true;
	} else {
		return false;
	}
}

// Export a save file
function exp() {
	prompt('Exported Save: ', btoa(JSON.stringify(game)));
}

// Import a save file
function imp() {
	let b64 = prompt('Enter a save file: ');
	let c = true;
	if (b64 == null) {
		c = false;
	}
	let json;
	try {
		json = atob(b64);
	} catch(e) {
		c = false;
		alert(e);
	}
	if (c) {
		if (confirm('Are you sure? This will override your current progress!')) {
			clearAll();
			game = new Game(JSON.parse(json));
			save();
			return true;
		} else {
			return false;
		}
	}
}

let game;

function init() {
	game = new Game();
	
	if (!load()) {
		firstTime();
	}
	
	document.getElementById('asintv').value = game.asintv;
	setInterval(loop, 50);
}

function firstTime() {
	game.prestige['[0]'] = new Layer([0], 100);
}

function loop() {
	game.update();
	setElems();
	updatePrestiges();
}