function setSettingsValidation(){
	$("#settingsForm").validate({
        rules: {
            dotsCount: {
                range: [50,90]
			},
            monstersCount: {
				range: [1,4]
            },
			setGameTimer: {
				min: 60
				// range: [60,120]	
			}
		},
        submitHandler: function() {
            SwitchDisplay('welcome',false);
        }
    });

}


function bindNewKey(btnID) {
	let myBtn = $("#" +btnID);
	$("#setKeyModal").modal({
		clickClose: false,
	  });	
	$(document).on('keydown',function(e) {
		let keyPressed = e.key;
		console.log(e.keyCode);
		if(  !(Object.values(settingsMovementButtons).includes(keyPressed) || Object.values(badKeys).includes(e.keyCode)) ) {

			myBtn.html(keyPressed);
			settingsMovementButtons[btnID] = keyPressed;
			
			$.modal.close();
			$(document).off('keydown');		
		}
	});
	return false;
}



function randomizeSettings(){
	$("#5ptsColor").val(getRandomColor());
	$("#15ptsColor").val(getRandomColor());
	$("#25ptsColor").val(getRandomColor());
	$('#dotsCount').val(getRndValue(50,90));
	$('#monstersCount').val(getRndValue(1,4));
	$('#setGameTimer').val(getRndValue(60,120));
}


function getRandomColor() {
	let letters = '0123456789ABCDEF';
	let color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

function getRndValue(min,max){
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}


  