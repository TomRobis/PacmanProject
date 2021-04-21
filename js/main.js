$(document).ready(function() {
	SwitchDisplay('welcome');
	
	setSignupValidation();
	setLoginValidation();
	setSettingsValidation();

});


 function SwitchDisplay(pageID) {
	$(".menu_container:visible").trigger("reset");
    $('.menu_wrapper').hide();
	$('#' + pageID).show();
};
