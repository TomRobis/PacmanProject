class pacman extends drawableOnGameBoard{
    
    constructor(startPos) {
        super(startPos);
        this.nextPos = startPos;
        this.speed = OBJ_SPEEDS.PACMAN;
        this.dir = null;
        this.lastDir = null;
        // this.rotation = true;
    
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, wallSizePxl/2, 0.2 * Math.PI, 1.8 * Math.PI);
        ctx.lineTo(this.pos.x, this.pos.y);
        ctx.closePath();
        ctx.fillStyle = "#FF0";
        ctx.fill();
        // ctx.strokeStyle = '#ff3300';
        // ctx.stroke();
    }   
    updateDir(newDir){
        this.lastDir = this.dir;
        switch(newDir) {
            case $("#setUpKey").text(): // should be fixed to more modular impl, allong with rest of these calls
                this.dir = DIRECTIONS.UP;
                break;
            case $("#setDownKey").text():
                this.dir = DIRECTIONS.DOWN;
                break;
            case $("#setLeftKey").text():
                this.dir = DIRECTIONS.LEFT;
                break;
            case $("#setRightKey").text():
                this.dir = DIRECTIONS.RIGHT;
                break;
            // case userInputKeys:
                // refer to gameMaster
                // break;
            default:
              break;
        }   
    }
    updatePosition(){
        if (this.moveMeTo(this.dir)){
            this.lastDir = this.dir;
        }else{
            this.moveMeTo(this.lastDir);           
        }
    }

    // not recognizing walls properly
    // running over candy without redrawing them

    moveMeTo(currDir){
        if(currDir != null){
            let attempted = this.getNextPos(currDir);
            let collision = gb.checkCollisions(attempted);
            if (!collision){
                this.pos = attempted;
                this.gridToAxis(this.pos); 
                this.draw();
                return true;
            }
        }
        return false;
    }
    getNextPos(currDir){
        let nextPos = new Object();
        nextPos.x = this.pos.x + currDir[0] * this.speed;
        nextPos.y = this.pos.y + currDir[1] * this.speed;
        nextPos = this.axisToGrid(nextPos);
        nextPos[0] = Math.floor(this.pos[0] + currDir[0]);
        nextPos[1] = Math.floor(this.pos[1] + currDir[1]);
        return nextPos;
        // switch(currDir)
        // {                        
        //         case DIRECTIONS.DOWN:
        //             this.nextPos[0] = Math.ceil(this.nextPos[0]);
        //             this.nextPos[1] = Math.floor(this.nextPos[1]);
        //             break;   
        //         case DIRECTIONS.RIGHT:
        //             this.nextPos[0] = Math.floor(this.nextPos[0]);
        //             this.nextPos[1] = Math.ceil(this.nextPos[1]);
        //             break;  
        //         default: // left and up
        //             this.nextPos[0] = Math.floor(this.nextPos[0]);
        //             this.nextPos[1] = Math.floor(this.nextPos[1]);
        //             break;  
        // }
    }
}
