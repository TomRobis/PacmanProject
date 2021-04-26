class drawableOnGameBoard{
    constructor(pos) {
        this.pos = pos;
        this.gridToAxis(this.pos);
    }
    gridToAxis(pos){
        pos.x = pos[1] * wallSizePxl + pacmanSizePxl; //top left corner originally 
        pos.y = pos[0] * wallSizePxl + pacmanSizePxl;
    }
    axisToGrid(pos){
        return [(pos.y - pacmanSizePxl) / wallSizePxl, (pos.x - pacmanSizePxl) / wallSizePxl]; 
    }
    getPos(){
        return this.pos;
    }

    // draw(){}
    // handleCollision(board,caller){}

}
