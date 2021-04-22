class ObjectSet extends Set{
    add(elem){
      return super.add(typeof elem === 'object' ? JSON.stringify(elem) : elem);
    }
    has(elem){
      return super.has(typeof elem === 'object' ? JSON.stringify(elem) : elem);
    }
  }

let context;
let shape = new Object();
let board;
let score = 0;
let start_time;
let time_elapsed;
let interval;
let randomLoc;
const foodCount = 50;

let candyImg = new Image();
candyImg.src = "./images/krabby_patty.png"


$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
    randomLoc = generateRandomLocation();
	let food_remain = foodCount;
    let randomNum;
	
	let pacman_location = [randomLoc[0],randomLoc[1]];
	start_time = new Date();
	for (var i = 0; i < rowCount; i++) {
		board[i] = new Array();
		for (var j = 0; j < colCount; j++) {
            if (obstacleLocations.has([i,j])){
                board[i][j] = obstacleID;
            
            } else if (monstersLocations.has([i,j])){
                board[i][j] = monsterID;

            } else if (i == pacman_location[0] && j == pacman_location[1]){
                shape.i = i;    
                shape.j = j;
                board[i][j] = pacmanID;

            randomNum = Math.random() * 100;
            } else if (food_remain > 0 && randomNum <= food_remain) {
                food_remain--;
                board[i][j] = foodID;

            } else {
				board[i][j] = emptyCellID;
            }
        }
    }
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = foodID;
		food_remain--;
	}
    // TODO deal with keystrokes
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	let i = Math.floor(Math.random() * 9 + 1);
	let j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

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

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < rowCount; i++) {
		for (var j = 0; j < colCount; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
             if (board[i][j] == foodID) {
                context.drawImage(candyImg,center.x-15,center.y-15,30,30);
            } else if (board[i][j] == pacmanID) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();

            } else if (board[i][j] == monsterID) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
				context.fill();
			} else if (board[i][j] == obstacleID) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
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
	time_elapsed = (currentTime - start_time) / 1000;
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function generateRandomLocation(){
    return [Math.floor(Math.random()*rowCount),Math.floor(Math.random()*colCount)];
}
