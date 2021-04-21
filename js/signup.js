
let usersDB = [
	{
		username: "k",
		password: "k",
		FullName: "k",
		Email: "k@k.com",
		Birthday: "3/3/2012"
	},
	{
		username: "avichaiedri1",
		password: "isTheBoss ",
		FullName: "k",
		Email: "k@k.com",
		Birthday: "3/3/2012"
	},
	{
		username: "tomrob123",
		password: "isAtLoss",
		FullName: "k",
		Email: "k@k.com",
		Birthday: "3/3/2012"
	}
];

let signupValidator;
let loginValidator;


export function defineValidators(){

    $.validator.addMethod("validPassword", function(value,element,usernameAttribute) {
		return usernameAttribute.val() !== "" && (value === "k" || (value.length >= 6 && hasNumberAndLetter(value)));
	}, "Your pass must have one number and one letter, and over 5 characters.");

	$.validator.addMethod("validFullName", function(value) {
		return hasOnlyLetters(value);
	}, "Your name must only contain letters.");

    $.validator.addMethod("validUserName", function(value) {
        return typeof getRecord(value) !== "undefined";
    }, "Please enter a valid username");

    signupValidator = $("#signupform").validate({
        rules: {
            Username: {
                required: true,
            },
            Password: {
                required: true,
                validPassword: $("#RegUsername")
    
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
    loginValidator = $("#loginForm").validate({
        rules: {
            Username: {
                required: true,
                validUserName: true
            },
            Password: {
                required: true,
                validPassword: $("#RegUsername")
    
            }
        },
        submitHandler: function() {
            loginUser();
        }
    });
}

export function setValidator(pageID){
    if (pageID === 'loginForm'){
        validator = loginValidator;
    }
    else if (pageID === 'signupform'){
        validator = signupValidator;
    }
}



function hasNumberAndLetter(myString) {
	let regex = /[a-zA-Z]\d/g;
	return regex.test(myString);
  }

function hasOnlyLetters(myString){
	let regex = /^[a-zA-Z]+$/;
	return regex.test(myString);

} 
function getRecord(recordID){
	return usersDB.find( ({ username }) => username === recordID );
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
        $('#signupform').trigger("reset");
        // SwitchDisplay('welcome');
        // console.log(usersDB[3]);
}

function loginUser(){
    SwitchDisplay('gameDiv');
}


