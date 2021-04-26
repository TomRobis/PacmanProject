class gameBoard {
    constructor(){
        this.ghosts =
        [    
            new ghost(GHOST_START_LOC.BLINKY,OBJECT_COLORS.BLINKY),
            new ghost(GHOST_START_LOC.PINKY,OBJECT_COLORS.PINKY),
            new ghost(GHOST_START_LOC.INKY,OBJECT_COLORS.INKY),
            new ghost(GHOST_START_LOC.CLYDE,OBJECT_COLORS.CLYDE)
        ];
        this.sGhost = new specialGhost(GHOST_START_LOC.SPECIALGHOST,OBJECT_COLORS.SPECIALGHOST);
        this.pacman = new pacman(this.getPacmanStartPos());

        this.gameOver = false;
        this.livesLeft = gameLives;

        this.placeWallsOnGameBoard();
    }

    getPacmanStartPos(){
        let pacmanLoc = this.findRandomEmptyCell();
        LEVEL[ pacmanLoc[0] ][ pacmanLoc[1] ] = BOARD_OBJECT_ID.PACMAN;
        return pacmanLoc;
    }


    placeWallsOnGameBoard(){
        let randomNum;
        let emptyCell;
        let foodRemain = $("#dotsCount").val();
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

    initGameBoard(ghosts,sGhost){
        let gridPos;
        let dotColor;
        let gridVal;
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < colCount; j++) {
                gridPos = [i,j];
                switch(LEVEL[i][j])
                {                        
                    case BOARD_OBJECT_ID.WALL:
                        LEVEL[i][j] = new wall(gridPos);
                        break;
                    case BOARD_OBJECT_ID.PACMAN:
                        LEVEL[i][j] = new pacman(gridPos); 
                        break;
                    case BOARD_OBJECT_ID.DOTFIVE:
                    case BOARD_OBJECT_ID.DOTFIFTEEN:
                    case BOARD_OBJECT_ID.DOTTWENTYFIVE:
                        dotColor = $("#" + LEVEL[i][j] + "ptsColor").val();
                        LEVEL[i][j] = new dot(gridPos,gridVal,dotColor); // TODO update later
                        break;
                    default:
                        break;
                }

            }
        }
        this.setGhosts();
    }
    draw(){
        let gridCellObject;
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < colCount; j++){
                gridCellObject = LEVEL[i][j];
                if (gridCellObject != BOARD_OBJECT_ID.BLANK){
                    gridCellObject.draw();    
                }
                else{
                    // ctx.clearRect(j*wallSizePxl,i*wallSizePxl, wallSizePxl, wallSizePxl);
                }
            }
        }
    }
    // caller gridObj
    // pacman ghost -> end-game V
    // ghost pacman -> end-game V
    // sGhost pacman -> update score, delete other V
    // pacman sGhost -> update score, delete other V 
    // pacman dot -> update score, delete other V
    // ghost / dot -> store dot, set position V
    // ghost / ghost -> switch positions V
    // other / blank -> switch positions V
    // other / wall -> nothing  V






    checkCollision(caller,nextPos){
        let gridObj = LEVEL[nextPos[0]][nextPos[1]];
        let collision = true;
        if (!(gridObj instanceof wall)){
            if(gridObj == BOARD_OBJECT_ID.BLANK){
                collision = caller.setPosition(nextPos);
            }
            else if(caller instanceof ghost){
                collision = gridObj.handleGhostCollision(this,caller);
            }
            else if(caller instanceof pacman){
                collision = gridObj.handlePacmanCollision(this,caller);
            }
        }  
        return collision;
    }
    switchPositions(first,second){
        firstPos = first.getPos();
        secondPos = second.getPos();
        LEVEL[firstPos[0]][firstPos[1]] = second;
        LEVEL[secondPos[0]][secondPos[1]] = first;
        return false;
    }

    lifeLost(){
        return false;
    }

    updateScore(addToScore){
        return false;
    }
    
    setGhosts(){
        let ghostsLocs = Object.values(GHOST_START_LOC);
        for (let i=0; i < monstersCount; i++) {
            LEVEL[ghostsLocs[i][0]][ghostsLocs[i][1]] = this.ghosts[i]; 
        }
        LEVEL[GHOST_START_LOC.SPECIALGHOST[0]][GHOST_START_LOC.SPECIALGHOST[1]] = this.sGhost; 
    }
    getPacMan(){
        return this.pacman; 
    }
    getGhosts(){
        return this.ghosts;
    }
    getSpecialGhost(){
        return this.sGhost;
    }

}