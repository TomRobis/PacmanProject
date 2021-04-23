 
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
                let someDot;  // TODO think of moving this away from here depeneding on dot functionality
                switch(LEVEL[i][j])
                {                        
                    case BOARD_OBJECT_ID.WALL:
                        this.drawWall();
                        break;
                    case BOARD_OBJECT_ID.DOTFIVE:
                        someDot = new dot([i,j],"red"); // TODO update later
                        someDot.draw();
                        break;
                    case BOARD_OBJECT_ID.DOTFIFTEEN:
                        someDot = new dot([i,j],"green"); // TODO update later
                        someDot.draw();
                        break;
                    case BOARD_OBJECT_ID.DOTTWENTYFIVE:
                        someDot = new dot([i,j],"blue"); // TODO update later
                        someDot.draw();
                        break;  
                    default:
                        break;
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