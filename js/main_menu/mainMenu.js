$(document).ready(function() {
	SwitchDisplay('welcome');
	setSignupValidation();
	setLoginValidation();
	setSettingsValidation();
});


/**
 *
 *
 * @param {String} pageID: page to display
 * @param {Boolean} resetValues: indicator whether to reset previous page's values
 */
function SwitchDisplay(pageID,resetValues) {
	 
	 
	 if (inGame){
		 endGame(false);
	 }
	 if (resetValues){
		$(".menu_container:visible").trigger("reset");
	 }
    $('.menu_wrapper').hide();
	$('#' + pageID).show();
};


function displayAboutModal(){
	$("#welModal").modal({
		fadeDuration: 250
	  });
	return false;
}

function playGame(){
	if (activeUser == null){
		alert("Please login before playing");
	}
	else{
		SwitchDisplay('gameDiv',true);
    	startNewGame();
	}
    
}

