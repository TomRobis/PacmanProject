 
class gameBoard {
    constructor(){
        this.center = new Object();
        
    }

    initGameBoard() {
        this.placeWallsOnGameBoard();
        this.draw();
    }
    getPacmanStartPos(){
        let pacmanLoc = this.findRandomEmptyCell();
        LEVEL[ pacmanLoc[0] ][ pacmanLoc[1] ] = BOARD_OBJECT_ID.PACMAN;
        return pacmanLoc;
    }


    placeWallsOnGameBoard(){
        let randomNum;
        let emptyCell;
        let foodRemain = foodCount;
        while (foodRemain > 0) {
            randomNum = Math.random();
            emptyCell = this.findRandomEmptyCell();
            if(randomNum < FOOD_DISTRIBUTION.FIVE){
                LEVEL[ emptyCell[0] ][ emptyCell[1] ] = BOARD_OBJECT_ID.DOTFIVE;
            }
            else if(randomNum >= FOOD_DISTRIBUTION.FIVE && randomNum <= (FOOD_DISTRIBUTION.FIVE + FOOD_DISTRIBUTION.FIFTEEN)){
                LEVEL[ emptyCell[0] ][ emptyCell[1] ] = BOARD_OBJECT_ID.DOTFIFTEEN;
            }
            else { //remaining chance allocated to 25 pts dot
                LEVEL[ emptyCell[0] ][ emptyCell[1] ] = BOARD_OBJECT_ID.DOTTWENTYFIVE;
            }
            foodRemain--;
        }
    }



    findRandomEmptyCell() {
        let randCell = this.generateRandomLocation();
        while (LEVEL[randCell[0]][randCell[1]] != 0) {
            randCell = this.generateRandomLocation();
        }
        return randCell;
    }

    generateRandomLocation(){
        return [getRndValue(1,rowCount-2),getRndValue(1,colCount-2)];
    }

    draw(){
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < colCount; j++) {
                this.center.x = i * wallSizePxl;
                this.center.y = j * wallSizePxl;
                switch(LEVEL[i][j])
                {
                    case BOARD_OBJECT_ID.BLANK:
                        break;
                    case BOARD_OBJECT_ID.WALL:
                        this.drawWall();
                        break;
                    case BOARD_OBJECT_ID.DOTFIVE:
                        // context.beginPath();
                        // context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                        // context.fillStyle = "red"; //color
                        // context.fill();
                        break;
                    case BOARD_OBJECT_ID.DOTFIFTEEN:
                        // code block
                        break;
                    case BOARD_OBJECT_ID.DOTTWENTYFIVE:
                        break;  
                    case BOARD_OBJECT_ID.GHOST:
                        break;  
                    case BOARD_OBJECT_ID.PACMAN:

                        break;  
                    // will be replaced with blank later, as in just break instead of error message
                    default:
                        throw "error when drawing the board - board ID doesn't match any object that needs to be drawn";
                }
            }
        }
    }
    drawWall(){
        ctx.beginPath();
        ctx.rect(this.center.y, this.center.x , wallSizePxl,wallSizePxl);
        ctx.fillStyle = "grey"; //color
        ctx.fill();


        // return false;
    }
}