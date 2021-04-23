// import {startGame} from '../game/gameMaster';


function setLoginValidation(){
    $.validator.addMethod("userNameExists", function(value) {
		let userRec = getRecord(value);
        return typeof userRec !== "undefined";
    }, "");

	$.validator.addMethod("passwordMatches", function(value,elem,usernameAttr) {
		let userRec = getRecord(usernameAttr.val());
        return typeof userRec !== "undefined" && userRec.password === value;
    }, "your username or password do not match");

    $("#loginForm").validate({
        rules: {
            Username: {
                required: true,
                userNameExists: true
            },
            Password: {
                required: true,
                passwordMatches: $("#LogUsername")
            }
        },
        submitHandler: function() {
            SwitchDisplay('gameDiv',true);
            startGameSequence();
		}
	});
}