class extraHealthDot extends dot {

    constructor(startPos,score,color) {
        super(startPos,score,color);
        this.dotLives = getRandomInt(1,3);
    }
    handlePacmanCollision(board,caller){
        livesLeft+=this.dotLives;
        super.handlePacmanCollision(board,caller);
    }

    
}   