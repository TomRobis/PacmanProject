function backToMainMenu(){
    endGame(false);
    SwitchDisplay('welcome',false);
}


function pauseGame(){
    if (onPause){
        startIntervals();
        
    }
    else{
        stopGame();
    }

}
