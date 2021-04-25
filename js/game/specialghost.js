class specialGhost extends ghost{
    constructor(pos,color){
        super(pos);
        this.color = color;
        this.score = BOARD_OBJECT_ID.SPECIALGHOST;
    }
    getScore(){
        return this.score;
    }
    // if only i could extend dot too...
    handlePacmanCollision(board,caller){
        if(caller instanceof pacman){
            caller.setPosition(this.pos);
        }
        board.updateScore(this.score);
        return false;
    }
    
}