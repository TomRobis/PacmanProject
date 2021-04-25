class pacman extends drawableOnGameBoard{
    
    constructor(startPos) {
        super(startPos);
        this.dir = null;
        this.turnDir = null;
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
    updatePosition(){
        if (this.moveMeTo(this.turnDir)){
            this.dir = this.turnDir;
        }
        else{
            this.moveMeTo(this.dir);
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
        nextPos = this.axisToGrid(nextPos);
        nextPos[0] = Math.floor(this.pos[0] + currDir[0]);
        nextPos[1] = Math.floor(this.pos[1] + currDir[1]);
        return nextPos;
    }



    // }
    sumArrays(arr1,arr2){
        return arr1.map(function (num, idx) {
            return num + arr2[idx];
        })
    }
}
