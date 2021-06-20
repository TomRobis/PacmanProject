let settingsMovementButtons = 
	{
	setUpKey: "ArrowUp",
	setDownKey: "ArrowDown",
	setLeftKey: "ArrowLeft",
	setRightKey: "ArrowRight"
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

const badKeys = 
	{
	Enter: 13,
	Space: 32,
	Fn: 255,
	}