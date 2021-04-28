class dot extends drawableOnGameBoard {

    constructor(startPos,score,color) {
        super(startPos);
        this.color = color;
        this.score = score;
        this.regularDot = true;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y, dotSizePxl, 0, 2 * Math.PI);
        ctx.fillStyle = this.color; 
        ctx.fill();
    }
    handlePacmanCollision(board,caller){
        board.updateScore(this.score,this.regularDot);
        gb.setGridCell(caller.getPos(),BOARD_OBJECT_ID.BLANK); 
        caller.advance(board,this.pos);

        
        return false;
    }
    handleGhostCollision(board,caller){
        caller.setStoredDot(this);
        gb.setGridCell(caller.getPos(),BOARD_OBJECT_ID.BLANK); 
        caller.advance(board,this.pos);
        return false;
    }   
        
        
    getScore(){
        return this.score;
    }
    getColor(){
        return this.color;
    }

    setRegularDot(regularDot){
        this.regularDot = regularDot;
    }
}   