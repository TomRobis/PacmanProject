class wall extends drawableOnGameBoard{
    constructor(pos){
        super(pos);
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.pos.x - pacmanSizePxl, this.pos.y - pacmanSizePxl , wallSizePxl,wallSizePxl);
        ctx.strokeStyle = OBJECT_COLORS.WALL;
        ctx.stroke();
    }

}