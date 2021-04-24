class dot extends drawableOnGameBoard {

    constructor(startPos,color,score) {
        super(startPos);
        this.color = color;
        this.score = score;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y, dotSizePxl, 0, 2 * Math.PI);
        ctx.fillStyle = this.color; 
        ctx.fill();
    }
    
}   