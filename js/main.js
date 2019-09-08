// Chuck your data into the depths of the localStorage variable...
function save() {
	localStorage.setItem('save', JSON.stringify(game));

	if (game.autosave) {
		setTimeout(save, 1000 * game.autosaveintv);
	}
}

// Clear the save file
function wipe() {
	if (confirm('Do you want to delete ALL of your progress?!?')) {
		delete localStorage['save'];
		game = new Game();
		ftl();
		save();
	}
}

// Retrieve your data from the depths of the localStorage variable...
function load() {
	if (localStorage.getItem('save') != undefined && localStorage.getItem('save') != 'undefined' && localStorage.getItem('save') != null) {
		game = new Game();
		loadSave(JSON.parse(localStorage.getItem('save')))
		return true;
	} else {
		return false;
	}
}

function init() {
	sbht = 0;
	if (!load()) {
		game = new Game();
		ftl();
	}
	save();
	document.getElementById('asintv').value = game.autosaveintv;
	setInterval(gameLoop, 50);
}

let timer = 0;

function gameLoop() {
	setElems();
	game.time++;
	game.autosaveintv = document.getElementById('asintv').value;
	updatePrestiges();
	for (let i in game.prestige) {
		game.prestige[i].updandgen();
	}
}
