let ctx;

function startGameSequence(){
    ctx  = canvas.getContext("2d");
    let gb = new gameBoard();
    let pacmanInstance = new pacman(gb.getPacmanStartPos()); 
    let i;  
    let ghosts =
     [
        new ghost(GHOST_START_LOC.SPECIALGHOST,OBJECT_COLORS.SPECIALGHOST),
        new ghost(GHOST_START_LOC.BLINKY,OBJECT_COLORS.BLINKY),
        new ghost(GHOST_START_LOC.PINKY,OBJECT_COLORS.PINKY),
        new ghost(GHOST_START_LOC.INKY,OBJECT_COLORS.INKY),
        new ghost(GHOST_START_LOC.CLYDE,OBJECT_COLORS.CLYDE)
    ];
    //for testing mostly
    gb.initGameBoard(); 
    pacmanInstance.draw();
    for (i = 0; i - 1 < $("#monstersCount").val(); i++){
        ghosts[i].draw();
    }
    return false;

}
function stopGame(){
    //stop game div
    SwitchDisplay('welcome');
    return false;
}


