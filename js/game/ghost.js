class ghost extends movable{
    constructor(startPos,color) {
        super(startPos);
        this.color = color;
        this.randomDirectionAlpha = 0.05;
        this.dotStorage = [];

    }

    draw() {
        let radius = pacmanSizePxl;
        let feet = 4;
        let head_radius = radius * 0.8;
        let foot_radius = head_radius / feet;
        ctx.save();
        // ctx.strokeStyle =  "white";
        ctx.fillStyle =  this.color;
        ctx.lineWidth =  radius * 0.05;
        ctx.beginPath();
        for (let foot = 0; foot < feet; foot++) {
            ctx.arc(
                (this.pos.x + 2 * foot_radius * (feet - foot)) - head_radius - foot_radius,
                this.pos.y + radius - foot_radius,
                foot_radius, 0, Math.PI
            );
        }
        ctx.lineTo(this.pos.x + -head_radius,this.pos.y +  radius - foot_radius);
        ctx.arc(this.pos.x, this.pos.y +  head_radius - radius, head_radius, Math.PI, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        // ctx.stroke();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.pos.x + -head_radius / 2.5,this.pos.y +  -head_radius / 2, head_radius / 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.pos.x + head_radius / 3.5,this.pos.y +  -head_radius / 2, head_radius / 3, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.pos.x + -head_radius / 2,this.pos.y +  -head_radius / 2.2, head_radius / 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.pos.x + head_radius / 4,this.pos.y +  -head_radius / 2.2, head_radius / 8, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
    }

    updatePosition(board){
        this.updateDir(board.getPacMan().getPos());
        let hasMoved = super.updatePosition(board);

        //testing
        if (hasMoved && this.hasStoredDot()){
            console.log(this.dotStorage);
        }



        if (hasMoved && this.hasStoredDot()){
            let firstDotInStorage = this.popFirstDot();
            // board.setGridCell(firstDotInStorage.getPos(),BOARD_OBJECT_ID.BLANK);

            board.setGridCell(firstDotInStorage.getPos(),firstDotInStorage);
        
        }
    }

    updateDir(pacmanPos){
        if(Math.random() <= this.randomDirectionAlpha){
            //random dirs
            this.dir = Object.values(DIRECTIONS)[getRandomInt(0,3)];
            this.turnDir = Object.values(DIRECTIONS)[getRandomInt(0,3)];
        }
        else{
            let diffX = this.pos[1] - pacmanPos[1];
            let diffY = this.pos[0] - pacmanPos[0];
            
            // normalize to a direction

            // prefer horizontal movement
            this.turnDir = [ 0, this.findDir(diffX) ];
            this.dir = [  this.findDir(diffY) , 0];

             /* move based on larger distance to pacman */
            //  let diffXLarger = Math.abs(diffX - diffY) > 0 ? true : false; 
            
            // if (diffXLarger){
            //     this.turnDir = dirX;
            //     this.dir = dirY;
            // }
            // else{
            //     this.turnDir = dirY;
            //     this.dir = dirX;
            // }
            
            
        }
    }

    handlePacmanCollision(board,caller){
        board.lifeLost();
        return true;
    }

    handleGhostCollision(board,caller){
        if (caller.hasStoredDot()){
            this.switchStoredDots(caller);
        }
        return board.switchPositions(this,caller);
    }
    findDir(locationDiff){
        // stair function
        let dir;
        if(locationDiff > 0){
            dir = -1;
        }
        else if (locationDiff < 0) {
            dir = 1;
        }
        else{
            dir = 0;
        }
        return dir;
    }
    setStoredDot(dot){
        this.dotStorage.push(dot);
    }
    hasStoredDot(){
        return this.dotStorage.length !== 0;
    }

    getStoredDot(){ //might be risky *********************
        
        if (this.hasStoredDot()){
            return this.dotStorage[0];
        }
        return null;
        
    }
    popFirstDot(){
        return this.dotStorage.shift();
    }

    switchStoredDots(otherGhost){

        let tmpDot = this.dotStorage.popFirstDot();
        this.setStoredDot(otherGhost.popFirstDot());
        otherGhost.setStoredDot(tmpDot);
        
    }



}