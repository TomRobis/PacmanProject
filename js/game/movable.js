class movable extends drawableOnGameBoard{
    constructor(startPos) {
        super(startPos);
        this.dir = DIRECTIONS.STATIONARY; 
        this.turnDir = DIRECTIONS.STATIONARY;
        this.facingDir = PACMAN_FACING_DIR[(DIRECTIONS.RIGHT).join()];
        this.prevPos = null;
    
    }


    moveMeTo(currDir,gb){
        if(!equals(currDir,DIRECTIONS.STATIONARY)){
            let nextPos = sumArrays(this.pos,currDir);
            this.gridToAxis(nextPos); 
            return !gb.checkCollision(this,nextPos);
        }
        return false;
    }

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

    advance(gb,nextPos){
        let somePos = nextPos;
        gb.setGridCell(nextPos,this); 
        this.prevPos = this.pos;
        this.pos = somePos;
        return false;
    }

    setFacingDir(currDir){
        if(!equals(currDir, DIRECTIONS.STATIONARY)){
            this.facingDir = PACMAN_FACING_DIR[(currDir.join())];
        }
        
    }
}