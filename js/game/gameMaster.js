let ctx;
function startGameSequence(){
    ctx  = canvas.getContext("2d");
    let gb = new gameBoard();
    gb.initGameBoard();
    let pacmanInstance = new pacman(gb.getPacmanStartPos()); 
    pacmanInstance.draw();
    const ghosts = 
        {
            firstGhost: new ghost([1,1],"red"),
            secondGhost: new ghost([rowCount-2,colCount-2],"green"),
            thirdGhost: new ghost([rowCount-2,1],"blue"),
            fourthGhost: new ghost([1,colCount-2],"brown")
        }
    Object.values(ghosts).map(ghost => {
        console.log(ghost.draw())
        })
    return false;

}
function stopGame(){
    //stop game div
    SwitchDisplay('welcome');
    return false;
}