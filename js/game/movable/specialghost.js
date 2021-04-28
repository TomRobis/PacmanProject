class specialGhost extends ghost{
    constructor(pos,color){
        super(pos);
        this.color = color;
        this.randomDirectionAlpha=1;
    }
    getScore(){
        return this.score;
    }

    handlePacmanCollision(board,caller){
        let innerDot = new dot(this.pos,BOARD_OBJECT_ID.SPECIALGHOST,"red");
        innerDot.setRegularDot(false); // doesn't count as dot
        let collision =  innerDot.handlePacmanCollision(board,caller);  
        clearInterval(specialGhostInterval);
        return collision;
    }
    draw()
    {
        let x= this.pos.x;
        let y=this.pos.y
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(x,y,12.5,0,2*Math.PI,true);
        ctx.fillStyle="orange";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x,y,10,0,2*Math.PI,true);
        ctx.fillStyle="yellow";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x-4,y+2,2,0,2*Math.PI,true);
        ctx.fillStyle="red";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x+3,y-4,2,0,2*Math.PI,true);
        ctx.fillStyle="red";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x+6,y+5,2,0,2*Math.PI,true);
        ctx.fillStyle="red";
        ctx.fill();
        ctx.closePath();
        ctx.fill();
    }
    
}