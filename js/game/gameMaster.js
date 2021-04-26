let gb;
let monstersCount;

let timeElapsed;
let pacmanInstance;
let ghosts;
let sGhost;
let livesLeft = gameLives;
let startTime = new Date();
let timeOut = false;
let totalScore = 0;

// let pacmanInterval;
// let ghostsInterval;
// let specialGhostInterval;
let intervals;

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function startGameSequence(){
    
    monstersCount = $("#monstersCount").val()
    ctx  = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // mainly for new lives
    setEventListeners();

    gb = new gameBoard();
    pacmanInstance = gb.getPacMan();    
    ghosts = gb.getGhosts();
    sGhost = gb.getSpecialGhost();

    gb.initGameBoard();
    gb.draw();

    
    pacmanInterval = setInterval(pacmanLoop,100);
    ghostsInterval = setInterval(ghostsLoop,200);
    specialGhostInterval = setInterval(specialGhostLoop,350);
    
}
function pacmanLoop(){
    pacmanInstance.updatePosition(gb);
    gb.draw();
    updateDisplay();
}
function ghostsLoop(){
    for (i = 0; i  < monstersCount; i++){
        ghosts[i].updatePosition(gb);
    }
    gb.draw();
}
function specialGhostLoop(){
    sGhost.updatePosition(gb);
    gb.draw();
}


function stopGame(){
    clearInterval(pacmanInterval);
    clearInterval(ghostsInterval);
    clearInterval(specialGhostInterval);
}

function setEventListeners(){
    addEventListener(
        "keydown",
        function(e) {
            pacmanInstance.updateDir(e.key);
        },
        false
    );
}

function sumArrays(arr1,arr2){
    return arr1.map(function (num, idx) {
        return num + arr2[idx];
    })
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function updateDisplay(){ 
    timeElapsed = (new Date() - startTime) / 1000;
    if (isTimeOut()){ // requires testing
        endGame();
    } 
    totalScore += gb.getScore();
    $("#lblTime").val(timeElapsed);
    $("#lblScore").val(totalScore);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
function generateNewGrid(){
    let newGrid = new Array(rowCount);
    for(let i=0; i<rowCount; i++){
        newGrid[i] = new Array(colCount);
        for(let j=0; j<colCount; j++){
            newGrid[i][j]=LEVEL[i][j];
        }
    }
    return newGrid;
}
function endGame(){
    stopGame();
    if(livesLeft == 0){
        alert('Loser!');
    }
    // time out
    else { 
        if(totalScore < 100){
            alert('You are better than ' + livesLeft + ' points!');
        }
        else{
            alert('Winner winner, KFC dinner!');
        }
    }
}


function lifeLost(){
    if(--livesLeft > 0){
        alert('you have ' + livesLeft +  ' lives left');
        stopGame();
        startGameSequence();
    }
    else{
        endGame();
    }
}
function isTimeOut(){
    return timeElapsed > $("#gameTimer");
}

