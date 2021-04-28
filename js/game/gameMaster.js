let ctx;
let gb;
let pacmanInstance;
let ghosts;
let sGhost;

let totalScore;
let numOfDots;
let dotsLeft;
let monstersCount;


let timeLeft;
let livesLeft;
let startTime;
let timeLimit;

let pacmanInterval;
let ghostsInterval;
let specialGhostInterval;

let miniGameOver;
let inGame;

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);



function startNewMiniGame(){
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
    if(!miniGameOver){
        pacmanInstance.updatePosition(gb);
        gb.draw();
        checkGameStatus();
    }
    else{
        lifeLost();
    }


}
function ghostsLoop(){
    for (i = 0; i  < monstersCount; i++){
        ghosts[i].updatePosition(gb);
    }
}
function specialGhostLoop(){
    sGhost.updatePosition(gb);
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
        gb.setNewPacman();
        miniGameOver = false;
        // stopGame();
        // startNewMiniGame();
    }
    else{
        $("#gameSetLivesLeft").val(0);
        endGame(true);
    }
}

function endGame(displayEndGameMessages){
    stopGame();
    removeEventListeners();
    pauseMusic();
    inGame = false;
    if (displayEndGameMessages){
        if(livesLeft == 0){
            alert('Loser!');
        }
        // time out
        else { 
            if(totalScore < 100){
                alert('You are better than ' + totalScore + ' points!');
            }
            else{
                alert('Winner!!!');
            }
        }
    }

}


function startNewGame(){
    stopGame();
    playMusic();
    displayGameSettings();
    setGameVariables();
    setEventListeners();
    startNewMiniGame();

}

function startIntervals(){
    pacmanInterval = setInterval(pacmanLoop,100);
    ghostsInterval = setInterval(ghostsLoop,250);
    specialGhostInterval = setInterval(specialGhostLoop,350);
    onPause = false;
}

function checkGameStatus(){ 
    let timePassed =  (new Date() - startTime) / 1000;
    timeLeft = timeLimit - timePassed;
    totalScore = gb.getScore();
    dotsLeft = numOfDots - gb.getEatenDots();

    if (timeLeft <= 0 || dotsLeft == 0){ 
        endGame(true);
    } 
    else{
        updateDisplay();
    }
    
}
function updateDisplay(){
    $("#gameSetTimer").val(timeLeft.toFixed(2));
    $("#gameSetScore").val(totalScore);
    $("#gameSetDotsLeft").val(dotsLeft);
    $("#gameSetLivesLeft").val(livesLeft);
}



function setGameVariables(){

    monstersCount = $("#monstersCount").val();
    ctx  = canvas.getContext("2d");
    livesLeft = gameLives;
    startTime = new Date();
    totalScore = 0;
    numOfDots = parseInt($("#dotsCount").val());
    timeLimit = $("#setGameTimer").val(); 
    $("#gameSetUserName").html('User: ' + '<b>' + activeUser + '</b>');
    onPause = false;
    musicOn = true;
    inGame = true;
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