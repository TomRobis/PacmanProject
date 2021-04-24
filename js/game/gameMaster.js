let GMpacman;
let interval;
let gb;
let pacmanInstance;
const ghosts =
[
    new ghost(GHOST_START_LOC.SPECIALGHOST,OBJECT_COLORS.SPECIALGHOST),
    new ghost(GHOST_START_LOC.BLINKY,OBJECT_COLORS.BLINKY),
    new ghost(GHOST_START_LOC.PINKY,OBJECT_COLORS.PINKY),
    new ghost(GHOST_START_LOC.INKY,OBJECT_COLORS.INKY),
    new ghost(GHOST_START_LOC.CLYDE,OBJECT_COLORS.CLYDE)
];   


function startGameSequence(){
    ctx  = canvas.getContext("2d");
    gb = new gameBoard();
    pacmanInstance = new pacman(gb.getPacmanStartPos());  

    setEventListeners();
    interval = setInterval(gameLoop,100);
    
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
function gameLoop(){
    pacmanInstance.updatePosition();
    //ghosties update their positions
    draw();
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