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
        
        if(caller instanceof pacman){
            caller.setPosition(this.pos);
            // caller.redraw();x
            }
        board.updateScore(this.score);
        return false; // not a collision
        }
        
        
    getScore(){
        return this.score;
    }
    
}   