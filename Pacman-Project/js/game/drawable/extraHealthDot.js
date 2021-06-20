class extraHealthDot extends dot {

    constructor(startPos,score,color) {
        super(startPos,score,color);
        this.dotLives = getRandomInt(1,3);
        this.regularDot = false;
    }
    handlePacmanCollision(board,caller){
        livesLeft+=this.dotLives;
        super.handlePacmanCollision(board,caller);
    }

    
}   