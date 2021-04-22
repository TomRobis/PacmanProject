let ctx;
function startGameSequence(){
    ctx  = canvas.getContext("2d");
    let gb = new gameBoard();
    let pacmanInstance = new pacman(gb.getPacmanStartPos()); 
    gb.initGameBoard();
    pacmanInstance.draw();
    return false;

}
function stopGame(){
    //stop game div
    SwitchDisplay('welcome');
    return false;
}