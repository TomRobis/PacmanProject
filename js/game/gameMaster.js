let gb;
let monstersCount;


let pacmanInstance;
let ghosts;
let sGhost;


let pacmanInterval;

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function startGameSequence(){
    monstersCount = $("#monstersCount").val()
    ctx  = canvas.getContext("2d");
    gb = new gameBoard();
    pacmanInstance = gb.getPacMan();    
    ghosts = gb.getGhosts();
    sGhost = gb.getSpecialGhost();
    gb.initGameBoard();
    setEventListeners();

    gb.draw();
    pacmanInterval = setInterval(pacmanLoop,100);
    ghostsInterval = setInterval(ghostsLoop,200);
    // specialGhostInterval = setInterval(specialGhostLoop,350);
    
}
function pacmanLoop(){
    pacmanInstance.updatePosition(gb);
    gb.draw();
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
    //stop game div
    SwitchDisplay('welcome');
    return false;
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

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let i;
    gb.draw();
    pacmanInstance.draw();
    for (i = 0; i - 1 < $("#monstersCount").val(); i++){
        ghosts[i].draw();
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
