function setSignupValidation(){
    $.validator.addMethod("validPassword", function(value,element,usernameAttribute) {
		return (value === "k" || (value.length >= 6 && hasNumberAndLetter(value)));
	}, "Your pass must have one number and one letter, and over 5 characters.");

	$.validator.addMethod("validFullName", function(value) {
		return hasOnlyLetters(value);
	}, "Your name must only contain letters.");

    $("#signupform").validate({
        rules: {
            Username: {
                required: true,
            },
            Password: {
                required: true,
                validPassword: true
    
            },
            FullName: {
                required: true, 
                validFullName: true
            },
            Email: {
                required: true, 
                email: true
            },
    
            Birthday: {
                required: true 
            }
        },
        submitHandler: function() {
            handleNewUser();
        }
    });

}


function hasNumberAndLetter(myString) {
	let regex = /[a-zA-Z]\d/g;
	return regex.test(myString);
  }

function hasOnlyLetters(myString){
	let regex = /^[a-zA-Z]+$/;
	return regex.test(myString);

} 



function handleNewUser(){
        usersDB.push(
            {
            username: $("#RegUsername").val(),
            password: $("#RegPassword").val(),
            FullName: $("#RegFullName").val(),
            Email: $("#RegEmail").val(),
            Birthday: $("#RegBirthday").val()
            }	
        );
        SwitchDisplay('welcome');
        // console.log(usersDB[3]);
}




function updateGameSettings(){
	return true;
}