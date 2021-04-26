class specialGhost extends ghost{
    constructor(pos,color){
        super(pos);
        this.color = color;
    }
    getScore(){
        return this.score;
    }

    handlePacmanCollision(board,caller){
        let innerDot = new dot(this.pos,BOARD_OBJECT_ID.SPECIALGHOST,"red");
        let collision =  innerDot.handlePacmanCollision(board,caller);
        clearInterval(specialGhostInterval);
        return collision;
    }
    // ??
    // updatePosition(board){
    //     super.updatePosition(board);
    // }
    
}