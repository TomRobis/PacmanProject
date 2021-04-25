class dot extends drawableOnGameBoard {

    constructor(startPos,score,color) {
        super(startPos);
        this.color = color;
        this.score = score;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y, dotSizePxl, 0, 2 * Math.PI);
        ctx.fillStyle = this.color; 
        ctx.fill();
    }
    handleCollision(board,caller){
        if (typeof pacman.prototype.isPrototypeOf(caller)){
            board.updateScore(this.score);
            // this.removeFromGrid(this);
        }
    }
    getScore(){
        return this.score;
    }
    
}   