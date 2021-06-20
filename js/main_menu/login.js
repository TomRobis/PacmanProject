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
            login();
            
		}
	});
}

function loginPressed(){
    if (activeUser == null){
        SwitchDisplay('login',false);
    }
    else{
        logout();
    }
}



function logout(){
    activeUser = null;
    // $("#welPlay").prop('disabled', true);
    $('#welLogin').html('Login');
}

// login user into system and switch to the main page, without starting a new game.
function login(){
    activeUser = $("#LogUsername").val();
    // $("#welPlay").prop('disabled', false);

    alert('Login successful. You are now logged in as ' + activeUser);
    SwitchDisplay('welcome',true);
    $('#welLogin').html('Logout');

}
