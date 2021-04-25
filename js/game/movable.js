class movable extends drawableOnGameBoard{
    constructor(startPos) {
        super(startPos);
        this.dir = null;
        this.turnDir = null;
        this.prevPos = null;
        // this.rotation = true;
    
    }


    moveMeTo(currDir,gb){
        if(currDir != null){
            let nextPos = sumArrays(this.pos,currDir);
            this.gridToAxis(nextPos); 
            return !gb.checkCollision(this,nextPos);
        }
    }
    setPosition(nextPos){
        this.prevPos = this.pos;
        LEVEL[this.pos[0]][this.pos[1]] = BOARD_OBJECT_ID.BLANK; // delete previous instance
        LEVEL[nextPos[0]][nextPos[1]] = this; // advance 
        this.pos = nextPos;        
        
    }
    
}