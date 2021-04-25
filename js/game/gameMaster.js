let interval;
let gb;
let pacmanInstance;
let monstersCount;

const ghosts =
[    
    new ghost(GHOST_START_LOC.BLINKY,OBJECT_COLORS.BLINKY),
    new ghost(GHOST_START_LOC.PINKY,OBJECT_COLORS.PINKY),
    new ghost(GHOST_START_LOC.INKY,OBJECT_COLORS.INKY),
    new ghost(GHOST_START_LOC.CLYDE,OBJECT_COLORS.CLYDE)
];
const sGhost = new specialGhost(GHOST_START_LOC.SPECIALGHOST,OBJECT_COLORS.SPECIALGHOST);

function startGameSequence(){
    monstersCount = $("#monstersCount").val()
    ctx  = canvas.getContext("2d");
    gb = new gameBoard();
    pacmanInstance = new pacman(gb.getPacmanStartPos());    
    gb.initGameBoard(ghosts,sGhost);
    setEventListeners();

    gb.draw();
    pacmanInterval = setInterval(pacmanLoop,100);
    // ghostsInterval = setInterval(ghostsLoop,250);
    // specialGhostInterval = setInterval(specialGhostLoop,350);
    
}
function pacmanLoop(){
    pacmanInstance.updatePosition(gb);
    // gb.draw();
}
function ghostsLoop(){
    for (i = 0; i - 1 < monstersCount; i++){
        ghosts[i].updatePosition(gb);
    }
    gb.draw();
}
function specialGhostLoop(){
    specialGhost.updatePosition(gb);
    gb.draw();
}


function stopGame(){
    //stop game div
    SwitchDisplay('welcome');
    return false;
}

function setEventListeners(){
    addEventListener(
        "keydown",
        function(e) {
            pacmanInstance.updateDir(e.key);
        },
        false
    );
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let i;
    gb.draw();
    pacmanInstance.draw();
    for (i = 0; i - 1 < $("#monstersCount").val(); i++){
        ghosts[i].draw();
    }
}
function sumArrays(arr1,arr2){
    return arr1.map(function (num, idx) {
        return num + arr2[idx];
    })
}
Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}