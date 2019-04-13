// This is the guts of the Etch-a-Sketch magic 

// Set initial board size
var gridSize = 20;
const wrapper = document.querySelector('#wrapper');

// Function for erasing old board and drawing a new board to user's preference
function drawBoard(sideLength) {
	var ctr = 0;
	// Remove old board
	while (wrapper.firstChild) {
		wrapper.removeChild(wrapper.firstChild);
	}
	// Set board params
	const squareWidth = 450 / sideLength;;
	wrapper.setAttribute('style', 'grid-template-columns: repeat(' + sideLength + ', ' + squareWidth + 'px);' +
 							  'grid-template-rows: repeat(' + sideLength + ', ' + squareWidth + 'px); ');
	// Draw new board
	while (ctr < Math.pow(sideLength, 2)) {
		const div = wrapper.appendChild(document.createElement('div'));
		div.setAttribute('id', 'square');
		ctr++;
	}
}

function changeColor (e) {
	if (e.target.id == "square") {
		(e.target).setAttribute('style', 'background-color: #000 !important;');
	} else return;
}

function eraseColor (e) {
	if (e.target.id == "square") {
		(e.target).setAttribute('style', 'background-color: #fff !important;');
	} else return;
}

function rainbowColor (e) {
	if (e.target.id == "square") {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		(e.target).setAttribute('style', 'background-color: rgb(' + r + ', ' + g + ', ' + b + ', .8) !important;');
	} else return;
}

function buttonChoice (choice) {
	if (choice === "erase") {
		// Remove other event listeners
		document.removeEventListener('mouseover', changeColor);
		document.removeEventListener('mouseover', rainbowColor);
		document.addEventListener('mouseover', eraseColor);
	} else if (choice === "black") {
		// Remove other event listeners
		document.removeEventListener('mouseover', rainbowColor);
		document.removeEventListener('mouseover', eraseColor);
		document.addEventListener('mouseover', changeColor);
	} else if (choice === "reset") {
		size = prompt("How many units squared would you like your drawing board?", 20);
		drawBoard(size);
		// Remove other event listeners
		document.removeEventListener('mouseover', rainbowColor);
		document.removeEventListener('mouseover', eraseColor);
		document.addEventListener('mouseover', changeColor);
	} else {
		// Remove other event listeners
		document.removeEventListener('mouseover', changeColor);
		document.removeEventListener('mouseover', eraseColor);
		document.addEventListener('mouseover', rainbowColor);
	}
}

drawBoard(gridSize);
document.addEventListener('mouseover', changeColor);

// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll('button');
// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
 // and for each one we add a 'click' listener
  button.addEventListener('click', (e) => {
    buttonChoice(button.id);
  });
});

