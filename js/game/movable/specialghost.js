class specialGhost extends ghost{
    constructor(pos,color){
        super(pos);
        this.color = color;
        this.randomDirectionAlpha=1;
    }
    getScore(){
        return this.score;
    }


    // special ghost has the movement of a ghost, collision behavior of a dot and the looks of a pizza.
    // when a collision is made, a new dot is created with a pre - designated score that handles the collision for the ghost.
    // after the collision, the ghost ceases to exist, same as a dot.  
    handlePacmanCollision(board,caller){

        // dot behavior
        let innerDot = new dot(this.pos,BOARD_OBJECT_ID.SPECIALGHOST,"red");
        innerDot.setRegularDot(false); 
        let collision =  innerDot.handlePacmanCollision(board,caller);  
        if (this.hasStoredDot()){
            board.updateScore(this.getStoredDot().getScore(),true);
            this.oldDot = null;
        }
        if(this.hasNewDot()){
            board.updateScore(this.getNewStoredDot().getScore(),true);
            this.newDot = null;
        }

        
        // clearInterval(specialGhostInterval);
        sGhostEaten = true;
        return collision;
    }
    draw()
    {
        let x= this.pos.x;
        let y=this.pos.y        

        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.arc(x,y,12.5,0,2*Math.PI,true);
        ctx.fillStyle="orange";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x,y,10,0,2*Math.PI,true);
        ctx.fillStyle="yellow";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x-4,y+2,2,0,2*Math.PI,true);
        ctx.fillStyle="red";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x+3,y-4,2,0,2*Math.PI,true);
        // ctx.fillStyle="red";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(x+6,y+5,2,0,2*Math.PI,true);
        // ctx.fillStyle="red";
        ctx.fill();
        ctx.closePath();
        // ctx.fill();
    }
    
}