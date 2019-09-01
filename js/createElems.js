function createDiv (parentId, thisId) {
	let div = document.createElement('DIV');
	div.id = thisId;
	document.getElementById(parentId).appendChild(div);
}