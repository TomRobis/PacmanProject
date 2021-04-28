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

    // when pacman collides with a dot, dot "sends" its score to the board, vanishes and moves pacman to its position.
    handlePacmanCollision(board,caller){
        board.updateScore(this.score,this.regularDot);
        gb.setGridCell(caller.getPos(),BOARD_OBJECT_ID.BLANK); 
        caller.advance(board,this.pos);

        
        return false;
    }


    // when pacman collides with a ghost, dot "sends" itself to the ghost, vanishes and moves the ghost to its position.
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

    // indicator to whether this dot should be counted when eaten or not (relevant for end - game)
    setRegularDot(regularDot){
        this.regularDot = regularDot;
    }
}   