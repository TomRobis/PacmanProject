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
    handlePacmanCollision(board,caller){
        caller.setPosition(this.pos);
        board.updateScore(this.score);
        return false;
    }
    handleGhostCollision(board,caller){
        caller.storeDot(this);
        caller.setPosition(this.pos);
        return false;
    }   
        
        
    getScore(){
        return this.score;
    }

    
}   