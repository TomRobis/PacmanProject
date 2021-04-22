let ctx;
function startGameSequence(){
    ctx  = canvas.getContext("2d");
    let gb = new gameBoard();
    gb.initGameBoard();
    let pacmanInstance = new pacman(gb.getPacmanStartPos()); 
    pacmanInstance.draw();
    return false;

}
function stopGame(){
    //stop game div
    SwitchDisplay('welcome');
    return false;
}