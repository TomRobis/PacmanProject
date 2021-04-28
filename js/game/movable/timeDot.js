class timeDot extends dot {

    constructor(startPos,score,color) {
        super(startPos,0,color);
        this.color = color;
        this.score = score;
    }
    draw()
    {
        let x = this.pos.x;
        let y = this.pos.y;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x-6,  y-6);
        ctx.lineTo((x+6), y-6);
        ctx.closePath();
      
        // the outline
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.stroke();


        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+6,  y+6);
        ctx.lineTo((x-6), y+6);
        ctx.closePath();
      
        // the outline
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }
    handlePacmanCollision(board,caller){
        board.updateScore(this.score);
        timeLimit = String(parseInt(timeLimit) + 15);
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

    
}   