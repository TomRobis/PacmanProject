class pacman extends movable{
    
    constructor(startPos) {
        super(startPos);
        this.pctOpen = 0;
        this.startAngle = 0.2 * Math.PI;
        this.endAngle = 1.8 * Math.PI;
        this.facingDir = 0;
    
    }
    draw(){        
        if (this.dir != null){
            this.facingDir = PACMAN_FACING_DIR[(this.dir.join())];
        }
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, pacmanSizePxl,this.startAngle + (this.facingDir * Math.PI / 2) ,this.endAngle + (this.facingDir * Math.PI / 2));
        ctx.lineTo(this.pos.x, this.pos.y);
        ctx.closePath();
        ctx.fillStyle = OBJECT_COLORS.PACMAN;
        ctx.fill();
    } 
    updatePosition(gb){
        let hasMoved = true;
        if (this.moveMeTo(this.turnDir,gb)){
            this.dir = this.turnDir;
            this.turnDir = null;
            this.setFacingDir(this.dir);
            this.redraw();
        }
        else if (this.moveMeTo(this.dir,gb)){
            this.redraw();
        }

        
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
    setFacingDir(currDir){
        if(currDir != null){
            this.facingDir = PACMAN_FACING_DIR[(currDir.join())];
        }
        
    }
    redraw(){
        ctx.clearRect(this.prevPos[1] * wallSizePxl,this.prevPos[0] * wallSizePxl, wallSizePxl, wallSizePxl);
        this.draw();
    }
    
}
