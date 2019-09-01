// Chuck your data into the depths of the localStorage variable...
function save() {
	localStorage.setItem('save', JSON.stringify(game));
}

// Clear the save file
function wipe() {
	if (confirm('Do you want to delete ALL of your progress?!?')) {
		delete localStorage['save'];
		game = new Game();
		game.init();
		save();
	}
}

// Retrieve your data from the depths of the localStorage variable...
function load() {
	if (localStorage.getItem('save') != undefined && localStorage.getItem('save') != 'undefined' && localStorage.getItem('save') != null) {
		game = new Game();
		game.init(JSON.parse(localStorage.getItem('save')));
		return true;
	} else {
		return false;
	}
}

function init() {
	sbht = 0;
	if (!load()) {
		game = new Game();
		game.init();
		//save();
	}

	setInterval(gameLoop, 50);
}

function gameLoop() {
	//save();
	setElems();
}
