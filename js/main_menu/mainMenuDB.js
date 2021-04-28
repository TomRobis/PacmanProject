let settingsMovementButtons = 
	{
	setUpKey: "w",
	setDownKey: "s",
	setLeftKey: "a",
	setRightKey: "d"
	}

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

function getRecord(recordID){
	return usersDB.find( ({ username }) => username === recordID );
}

let activeUser = null;

