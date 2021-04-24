class pacman extends drawableOnGameBoard{
    
    constructor(startPos) {
        super(startPos);
        this.nextPos = [0,0];
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
            // let lastMoveAttempt = [this.nextPos[0],this.nextPos[1]];
            let nextMoveattempt = this.getNextPos(currDir);
            let collision = gb.checkCollisions(nextMoveattempt);
            if (!collision){
                this.pos = nextMoveattempt;
                return true;
            }
        }
        
        return false;
    }
    getNextPos(currDir){
        let nextPos = new Object();
        nextPos.x = this.pos.x + (currDir[1] * this.speed);
        nextPos.y = this.pos.y + (currDir[0] * this.speed);
        let nextPosGridLoc = this.axisToGrid(nextPos); 
        switch(currDir)
        {                        
                case DIRECTIONS.DOWN:
                    nextPos[0] = Math.ceil(nextPosGridLoc[0]);
                    nextPos[1] = Math.floor(nextPosGridLoc[1]);
                    break;   
                case DIRECTIONS.RIGHT:
                    nextPos[0] = Math.floor(nextPosGridLoc[0]);
                    nextPos[1] = Math.ceil(nextPosGridLoc[1]);
                    break;  
                default: // left and up
                    nextPos[0] = Math.floor(nextPosGridLoc[0]);
                    nextPos[1] = Math.floor(nextPosGridLoc[1]);
                    break;  
        }
        return nextPos;
    }



    // }
    sumArrays(arr1,arr2){
        return arr1.map(function (num, idx) {
            return num + arr2[idx];
        })
    }
}
