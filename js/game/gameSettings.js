let onPause;
let musicOn;


function backToMainMenu(){
    endGame(false);
    SwitchDisplay('welcome',false);
}


function toggleGamePause(){
    if (onPause){
        startIntervals();
        
    }
    else{
        stopGame();
    }

}
function toggleBackgroundMusic(){
    if (musicOn){
        document.getElementById("game_sound").pause();
        
    }
    else{
        document.getElementById("game_sound").play();
        document.getElementById("game_sound").volume = 0.1;
    }
    musicOn = !musicOn;
}
