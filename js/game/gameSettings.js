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
        pauseMusic();
        
    }
    else{
        playMusic();
        
    }
    musicOn = !musicOn;
}




function displayGameSettings(){
    // TODO make these into variables
    let up = $("#setUpKey").text();
    let down = $("#setDownKey").text();
    let left = $("#setLeftKey").text();
    let right = $("#setRightKey").text();
    $("#gameSetUpKey").val(up);
    $("#gameSetDownKey").val(down);
    $("#gameSetLeftKey").val(left);
    $("#gameSetRightKey").val(right);

    let fivePtsColor = $("#5ptsColor").val();
    let fifteenPtsColor = $("#15ptsColor").val();
    let twentyfivePtsColor = $("#25ptsColor").val();

    $('#gameSet5pts').css('background-color',fivePtsColor);
    $('#gameSet15pts').css('background-color',fifteenPtsColor);
    $('#gameSet25pts').css('background-color',twentyfivePtsColor);

    let numDots = $("#dotsCount").val();
    let numMonsters = $("#monstersCount").val();
    let maxGameTime = $("#setGameTimer").val();

    $("#gameSetDotsCount").val(numDots);
    $("#gameSetMonstersCount").val(numMonsters);
    $("#setGameMaxGameTime").val(maxGameTime);    

    $("#gameSetDotsLeft").val(numDots);
    
}   
function displayInstructions(){
    $("#setGameModal").modal({
		fadeDuration: 500
	  });
}
function playMusic(){
    document.getElementById("game_sound").play();
    document.getElementById("game_sound").volume = 0.1;
    document.getElementById("game_sound").playbackRate = 0.8;
}
function pauseMusic(){
    document.getElementById("game_sound").pause();
}