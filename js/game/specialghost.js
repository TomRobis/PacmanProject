class specialGhost extends ghost{
    constructor(pos,color){
        super(pos);
        this.color = color;
        this.innerDot = new dot(this.pos,BOARD_OBJECT_ID.SPECIALGHOST,"red");
    }
    getScore(){
        return this.score;
    }

    handlePacmanCollision(board,caller){
        return this.innerDot.handlePacmanCollision(board,caller);
    }
    
}