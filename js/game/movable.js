class movable extends drawableOnGameBoard{
    constructor(startPos) {
        super(startPos);
        this.dir = null;
        this.turnDir = null;
        // this.rotation = true;
    
    }
    updateDir(newDir){
        switch(newDir) {
            case $("#setUpKey").text(): // should be fixed to more modular impl, allong with rest of these calls
                this.turnDir = DIRECTIONS.UP;
                break;
            case $("#setDownKey").text():
                this.turnDir = DIRECTIONS.DOWN;
                break;
            case $("#setLeftKey").text():
                this.turnDir = DIRECTIONS.LEFT;
                break;
            case $("#setRightKey").text():
                this.turnDir = DIRECTIONS.RIGHT;
                break;
            // case userInputKeys:
                // refer to gameMaster
                // break;
            default:
              break;
        }   
    }
    updatePosition(gb){
        if (this.moveMeTo(this.turnDir,gb)){
            this.dir = this.turnDir;
        }
        else{
            this.moveMeTo(this.dir,gb);
        }
        
    }
    moveMeTo(currDir,gb){
        if(currDir != null){
            let nextPos = sumArrays(this.pos,currDir);
            this.gridToAxis(nextPos); 
            return !gb.checkCollision(this,nextPos);
        }
    }
    setPosition(nextPos){
        LEVEL[this.pos[0]][this.pos[1]] = BOARD_OBJECT_ID.BLANK; // delete previous instance
        LEVEL[nextPos[0]][nextPos[1]] = this; // advance 
        this.pos = nextPos;
    }
}