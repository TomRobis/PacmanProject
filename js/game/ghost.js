class ghost extends drawableOnGameBoard{
    constructor(startPos,color) {
        super(startPos);
        this.color = color;
    // this.speed = speed;
    // this.dir = null;
    // this.timer = 0;
    // this.powerPill = false;
    // this.rotation = true;
    }

    draw() {
        let radius = pacmanSizePxl;
        let feet = 4;
        let head_radius = radius * 0.8;
        let foot_radius = head_radius / feet;
        ctx.save();
        ctx.strokeStyle =  "white";
        ctx.fillStyle =  this.color;
        ctx.lineWidth =  radius * 0.05;
        ctx.beginPath();
        for (let foot = 0; foot < feet; foot++) {
            ctx.arc(
                (this.pos.x + 2 * foot_radius * (feet - foot)) - head_radius - foot_radius,
                this.pos.y + radius - foot_radius,
                foot_radius, 0, Math.PI
            );
        }
        ctx.lineTo(this.pos.x + -head_radius,this.pos.y +  radius - foot_radius);
        ctx.arc(this.pos.x, this.pos.y +  head_radius - radius, head_radius, Math.PI, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.pos.x + -head_radius / 2.5,this.pos.y +  -head_radius / 2, head_radius / 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.pos.x + head_radius / 3.5,this.pos.y +  -head_radius / 2, head_radius / 3, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.pos.x + -head_radius / 2,this.pos.y +  -head_radius / 2.2, head_radius / 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.pos.x + head_radius / 4,this.pos.y +  -head_radius / 2.2, head_radius / 8, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
    }
}