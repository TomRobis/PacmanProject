class killDot extends dot {

    constructor(startPos,score,color) {
        super(startPos,-100,color);
        this.color = color;
        this.counter = 1;
        this.regularDot = false;
    }
    draw()
    {
        let x= this.pos.x;
        let y=this.pos.y
        ctx.beginPath();
        ctx.fillStyle="yellow";
        ctx.arc(x,y,10,0,2*Math.PI);
        ctx.arc(x,y,9,0,2*Math.PI, true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x,y,1,0,2*Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x,y,8.5,(Math.PI/180)*(180/3+this.counter),(Math.PI/180)*(180/3*2+this.counter));
        ctx.arc(x,y,1.5,(Math.PI/180)*(180/3*2+this.counter),(Math.PI/180)*(180/3+this.counter), true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x,y,8.5,(Math.PI/180)*(180/3*3+this.counter),(Math.PI/180)*(180/3*4+this.counter));
        ctx.arc(x,y,1.5,(Math.PI/180)*(180/3*4+this.counter),(Math.PI/180)*(180/3*3+this.counter),true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x,y,8.5,(Math.PI/180)*(180/3*5+this.counter),(Math.PI/180)*(180/3*6+this.counter));
        ctx.arc(x,y,1.5,(Math.PI/180)*(180/3*6+this.counter),(Math.PI/180)*(180/3*5+this.counter), true);
        ctx.fill();
        this.counter+=10;
    }
    handlePacmanCollision(board,caller){
        super.handlePacmanCollision(board,caller);
        livesLeft++;
    }
        
        
    getScore(){
        return this.score;
    }
    getColor(){
        return this.color;
    }

    
}   