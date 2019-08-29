// Chuck your data into the depths of the localStorage variable...
function save() {
	localStorage.setItem('save', JSON.stringify(game));
}

// Clear the save file
function wipe() {
	if (confirm('Do you want to delete ALL of your progress?!?')) {
		delete localStorage['save'];
		setup();
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

function init() {
	// if (!load()) {
	// }
}