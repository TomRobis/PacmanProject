$(document).ready(function() {
	SwitchDisplay('welcome');
	
	setSignupValidation();
	setLoginValidation();
	setSettingsValidation();

});


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

