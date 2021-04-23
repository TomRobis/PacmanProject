class drawableOnGameBoard{
    constructor(startPos) {
        this.pos = startPos;
        this.pos.x = this.pos[1]*wallSizePxl + pacmanSizePxl; //top left corner originally 
        this.pos.y = this.pos[0]*wallSizePxl + pacmanSizePxl;
    }
    someMethod(){
        return false;
    }
}
