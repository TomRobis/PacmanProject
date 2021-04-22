// let context;
// let shape = new Object();
// let board;
// let score = 0;
// let startTime;
// let timeElapsed;
// let interval;
// let pacmanLoc;

// function startGame(){
// 	context = canvas.getContext("2d");
// 	alert("Hello! I am an alert box!!");
// 	let gb = new gameBoard();
// 	gb.initGameBoard();
	
// }
	


//     // TODO deal with keystrokes
// 	keysDown = {};
// 	addEventListener(
// 		"keydown",
// 		function(e) {
// 			keysDown[e.keyCode] = true;
// 		},
// 		false
// 	);
// 	addEventListener(
// 		"keyup",
// 		function(e) {
// 			keysDown[e.keyCode] = false;
// 		},
// 		false
// 	);
// 	interval = setInterval(UpdatePosition, 250);
// }


function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	timeElapsed = (currentTime - startTime) / 1000;
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		// Draw();
	}
}

