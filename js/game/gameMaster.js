let ctx;
let gb;
let pacmanInstance;
let ghosts;
let sGhost;

let totalScore;
let monstersCount;
let miniGameOver;

let timeElapsed;
let livesLeft;
let startTime;
let timeLimit;

let pacmanInterval;
let ghostsInterval;
let specialGhostInterval;
let onPause;

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);



function startNewMiniGame(){
    totalScore = 0;
    miniGameOver = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    gb = new gameBoard();
    pacmanInstance = gb.getPacMan();    
    ghosts = gb.getGhosts();
    sGhost = gb.getSpecialGhost();

    gb.initGameBoard();
    gb.draw();

    startIntervals();
    
}
function pacmanLoop(){
    if (!miniGameOver){
        pacmanInstance.updatePosition(gb);
        gb.draw();
        updateDisplay();
    }
    else{
        lifeLost();
    }

}
function ghostsLoop(){
    for (i = 0; i  < monstersCount; i++){
        ghosts[i].updatePosition(gb);
    }
    // gb.draw();
}
function specialGhostLoop(){
    sGhost.updatePosition(gb);
    // gb.draw();
}


function stopGame(){
    clearInterval(pacmanInterval);
    clearInterval(ghostsInterval);
    clearInterval(specialGhostInterval);
    onPause = true;
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



function lifeLost(){
    livesLeft--;
    if(livesLeft > 0){
        alert('you have ' + livesLeft +  ' lives left');
        stopGame();
        startNewMiniGame();
    }
    else{
        $("#gameSetLivesLeft").val(0);
        endGame(true);
    }
}

function endGame(displayEndGameMessages){
    stopGame();
    removeEventListeners();
    if (displayEndGameMessages){
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

}


function startNewGame(){
    stopGame();
    setGameVariables();
    setEventListeners();
    startNewMiniGame();

}

function startIntervals(){
    pacmanInterval = setInterval(pacmanLoop,100);
    ghostsInterval = setInterval(ghostsLoop,200);
    specialGhostInterval = setInterval(specialGhostLoop,350);
    onPause = false;
}

function updateDisplay(){ 
    timeElapsed = (new Date() - startTime) / 1000;
    totalScore = gb.getScore();
    $("#gameSetLivesLeft").val(livesLeft);

    if (timeElapsed > timeLimit){ // requires testing
        endGame(true);
    } 
    else{
        $("#gameSetTimer").val(timeElapsed);
        $("#gameSetScore").val(totalScore);
    }
    
    
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


function setGameVariables(){

    monstersCount = $("#monstersCount").val();
    ctx  = canvas.getContext("2d");
    livesLeft = gameLives;
    startTime = new Date();
    totalScore = 0;
    timeLimit = $("#setGameTimer").val(); 
    $("#gameSetUserName").html('User: ' + '<b>' + activeUser + '</b>');
    onPause = false;
}

function removeEventListeners(){
    removeEventListener(
        "keydown",
        function(e) {
            pacmanInstance.updateDir(e.key);
        },
        false
    );
}