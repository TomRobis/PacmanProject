class movable extends drawableOnGameBoard{
    constructor(startPos) {
        super(startPos);
        this.dir = DIRECTIONS.STATIONARY; 
        this.turnDir = DIRECTIONS.STATIONARY;
        this.facingDir = PACMAN_FACING_DIR[(DIRECTIONS.RIGHT).join()];
        this.prevPos = null;
    
    }


    // makes an attempt to move to a location on the grid. a collision test is done via gameboard. 
    // returns whether a collision has been made
    moveMeTo(currDir,gb){
        if(!equals(currDir,DIRECTIONS.STATIONARY)){
            let nextPos = sumArrays(this.pos,currDir);
            this.gridToAxis(nextPos); 
            return !gb.checkCollision(this,nextPos);
        }
        return false;
    }

    // basic movement - movable tries to turn if asked and if it can't, continues to move in the same direction.
    // returns whether the movable has been able to move to its' next position
    updatePosition(gb){
        let hasMoved;
        hasMoved = this.moveMeTo(this.turnDir,gb); 
        if (hasMoved){

            this.setFacingDir(this.turnDir);
            this.dir = this.turnDir;
            this.turnDir = DIRECTIONS.STATIONARY;

        } else {
            hasMoved = this.moveMeTo(this.dir,gb);
        }
        return hasMoved;
        
    }

    // moves a movable to a new position on the grid and DOES NOT update the previous cell with blank. 
    advance(gb,nextPos){
        let somePos = nextPos;
        gb.setGridCell(nextPos,this); 
        this.prevPos = this.pos;
        this.pos = somePos;
        return false;
    }

    // movables may want to be drawn differently based on direction 
    setFacingDir(currDir){
        if(!equals(currDir, DIRECTIONS.STATIONARY)){
            this.facingDir = PACMAN_FACING_DIR[(currDir.join())];
        }
        
    }
}