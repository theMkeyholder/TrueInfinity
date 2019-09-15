// Chuck your data into the depths of the localStorage variable...
function save() {
	localStorage.setItem('save', JSON.stringify(game));
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
		game = new Game(JSON.parse(localStorage.getItem('save')));
		return true;
	} else {
		return false;
	}
}

let game;

function init() {
	game = new Game();
	
	if (!load()) {
		firstTime();
	}
	
	setInterval(loop, 50);
}

function firstTime() {
	game.prestige['[0]'] = new Layer([0], 100);
}

function loop() {
	save();
	game.update();
	setElems();
	updatePrestiges();
}