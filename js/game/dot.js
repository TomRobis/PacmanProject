class dot extends drawableOnGameBoard {

    constructor(startPos,color) {
        super(startPos);
        this.color = color;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.y,this.pos.x, dotSizePxl, 0, 2 * Math.PI);
        ctx.fillStyle = this.color; 
        ctx.fill();
    }
}   