class movable extends drawableOnGameBoard{
    constructor(startPos) {
        super(startPos);
        this.dir = DIRECTIONS.STATIONARY; 
        this.turnDir = DIRECTIONS.STATIONARY;
        this.facingDir = DIRECTIONS.RIGHT;
        this.prevPos = null;
    
    }


    moveMeTo(currDir,gb){
        if(!equals(currDir,DIRECTIONS.STATIONARY)){
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

    updatePosition(gb){
        if (this.moveMeTo(this.turnDir,gb)){

            this.setFacingDir(this.turnDir);

            this.dir = this.turnDir;
            this.turnDir = DIRECTIONS.STATIONARY;

            this.redraw();
            this.draw();
        }
        else if (this.moveMeTo(this.dir,gb)){
            this.redraw();
            this.draw();
        }

        
    }
    setFacingDir(currDir){
        if(!equals(currDir, DIRECTIONS.STATIONARY)){
            this.facingDir = PACMAN_FACING_DIR[(currDir.join())];
        }
        
    }
    redraw(){
        ctx.clearRect(this.prevPos[1] * wallSizePxl,this.prevPos[0] * wallSizePxl, wallSizePxl, wallSizePxl);
        this.draw();
    }
    
    getPos(){
        return this.pos;
    }


}