class wall extends drawableOnGameBoard{
    constructor(pos){
        super(pos);
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.pos.x - pacmanSizePxl, this.pos.y - pacmanSizePxl , wallSizePxl,wallSizePxl);
        ctx.fillStyle = OBJECT_COLORS.WALL; 
        ctx.fill();
    }

}