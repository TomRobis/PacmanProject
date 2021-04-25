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
    handleCollision(board,caller){
        if (typeof ghost.prototype.isPrototypeOf(caller)){
            board.lifeLost();
        }
        else if(typeof specialGhost.prototype.isPrototypeOf(caller)){
            board.updateScore(caller.getScore());
            this.removeFromGrid(caller);
        }
        else{ // ???
            throw "unknown collision with pacman";
        } 
        
    }   
    updatePctOpen(){
        if (this.pctOpen < 1){
            this.pctOpen += pacmanAnimationSpeed;
        }
        else{
            this.pctOpen -= pacmanAnimationSpeed;
        }
    }
}
