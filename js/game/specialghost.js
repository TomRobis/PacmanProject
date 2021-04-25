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
    handleCollision(board,caller){
        if (typeof pacman.prototype.isPrototypeOf(caller)){
            board.updateScore(this.score);
            this.removeFromGrid(this);
        }
    }
}