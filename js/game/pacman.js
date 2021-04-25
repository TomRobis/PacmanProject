class pacman extends movable{
    
    constructor(startPos) {
        super(startPos);
    
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, pacmanSizePxl, 0.2 * Math.PI, 1.8 * Math.PI);
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
}
