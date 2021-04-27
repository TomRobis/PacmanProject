let onPause;
let musicOn;
let settingsCanvas;
let arrowSize;


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



function canvas_arrow(myCtx, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    myCtx.moveTo(fromx, fromy);
    myCtx.lineTo(tox, toy);
    myCtx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    myCtx.moveTo(tox, toy);
    myCtx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }


function displayGameSettings(){
    settingsCanvas = document.getElementById("gameSetCanvas").getContext("2d");
    arrowSize = 20;
    settingsCanvas.beginPath();
    settingsCanvas.fillStyle = "red";
    settingsCanvas.strokeStyle = "#FFFFFF";

    canvas_arrow(settingsCanvas, arrowSize, arrowSize, arrowSize, 0);
    canvas_arrow(settingsCanvas, arrowSize * 3, 0, arrowSize * 3, arrowSize );
    canvas_arrow(settingsCanvas, arrowSize * 6, arrowSize / 2, arrowSize * 5, arrowSize / 2);
    canvas_arrow(settingsCanvas, arrowSize * 8, arrowSize / 2, arrowSize * 9, arrowSize / 2);
    



    settingsCanvas.stroke();
}