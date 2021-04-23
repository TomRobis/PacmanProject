class pacman extends drawableOnGameBoard{
    //speed,
    constructor(startPos) {
        super(startPos);

    // this.speed = speed;
    // this.dir = null;
    // this.timer = 0;
    // this.powerPill = false;
    // this.rotation = true;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.y, this.pos.x, wallSizePxl/2, 0.2 * Math.PI, 1.8 * Math.PI);
        ctx.lineTo(this.pos.y, this.pos.x);
        ctx.closePath();
        ctx.fillStyle = "#FF0";
        ctx.fill();
        ctx.strokeStyle = '#ff3300';
        ctx.stroke();
    }   

}





//   shouldMove() {
//     // Don't move before a key is pressed
//     if (!this.dir) return;

//     if (this.timer === this.speed) {
//       this.timer = 0;
//       return true;
//     }
//     this.timer++;
//   }

//   getNextMove(objectExist) {
//     let nextMovePos = this.pos + this.dir.movement;
//     // Do we collide with a wall?
//     if (
//       objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
//       objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
//     ) {
//       nextMovePos = this.pos;
//     }

//     return { nextMovePos, direction: this.dir };
//   }

//   makeMove() {
//     const classesToRemove = [OBJECT_TYPE.PACMAN];
//     const classesToAdd = [OBJECT_TYPE.PACMAN];

//     return { classesToRemove, classesToAdd };
//   }

//   setNewPos(nextMovePos) {
//     this.pos = nextMovePos;
//   }

//   handleKeyInput = (e, objectExist) => {
//     let dir;

//     if (e.keyCode >= 37 && e.keyCode <= 40) {
//       dir = DIRECTIONS[e.key];
//     } else {
//       return;
//     }

//     const nextMovePos = this.pos + dir.movement;
//     if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return;
//     this.dir = dir;
//   };


