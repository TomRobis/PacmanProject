class gameBoard {
    constructor(){

        this.score = 0;
        this.gameGrid = generateNewGrid();


        this.ghosts =
        [    
            new ghost(GHOST_START_LOC.BLINKY,OBJECT_COLORS.BLINKY),
            new ghost(GHOST_START_LOC.PINKY,OBJECT_COLORS.PINKY),
            new ghost(GHOST_START_LOC.INKY,OBJECT_COLORS.INKY),
            new ghost(GHOST_START_LOC.CLYDE,OBJECT_COLORS.CLYDE)
        ];
        this.sGhost = new specialGhost(GHOST_START_LOC.SPECIALGHOST,OBJECT_COLORS.SPECIALGHOST);
        this.pacman = new pacman(this.getPacmanStartPos());


        this.placeWallsOnGameBoard();

        
    }

    getPacmanStartPos(){
        let pacmanLoc = this.findRandomEmptyCell();
        this.setGridCell(pacmanLoc,BOARD_OBJECT_ID.PACMAN)
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
                this.setGridCell(emptyCell,BOARD_OBJECT_ID.DOTFIVE);
            }
            else if(randomNum >= FOOD_DISTRIBUTION.FIVE && randomNum <= (FOOD_DISTRIBUTION.FIVE + FOOD_DISTRIBUTION.FIFTEEN)){
                this.setGridCell(emptyCell,BOARD_OBJECT_ID.DOTFIFTEEN);
            }
            else { //remaining chance allocated to 25 pts dot
                this.setGridCell(emptyCell,BOARD_OBJECT_ID.DOTTWENTYFIVE);
            }
            foodRemain--;
        }
    }

    findRandomEmptyCell() {
        let randCell = this.generateRandomLocation();
        while (this.gameGrid[randCell[0]][randCell[1]] != BOARD_OBJECT_ID.BLANK) {
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
                switch(this.gameGrid[i][j])
                {                        
                    case BOARD_OBJECT_ID.WALL:
                        this.setGridCell(gridPos,new wall(gridPos));
                        break;
                    case BOARD_OBJECT_ID.PACMAN:
                        this.setGridCell(gridPos,new pacman(gridPos));
                        break;
                    case BOARD_OBJECT_ID.DOTFIVE:
                    case BOARD_OBJECT_ID.DOTFIFTEEN:
                    case BOARD_OBJECT_ID.DOTTWENTYFIVE:
                        dotColor = $("#" + this.gameGrid[i][j] + "ptsColor").val();
                        this.setGridCell(gridPos,new dot(gridPos,this.gameGrid[i][j],dotColor));
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
        let gridCell;
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < colCount; j++){
                gridCellObject = this.gameGrid[i][j];
                gridCell = [i,j];
                ctx.clearRect(j*wallSizePxl,i*wallSizePxl, wallSizePxl, wallSizePxl); 
                if (!this.gridCellEmpty(gridCell)){
                    gridCellObject.draw();    
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
        let gridObj = this.gameGrid[nextPos[0]][nextPos[1]];
        let collision = true;
        if (!(gridObj instanceof wall)){
            if(this.gridCellEmpty(nextPos)){
                this.setGridCell(caller.getPos(),BOARD_OBJECT_ID.BLANK); 
                collision = caller.advance(this,nextPos);               
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
    switchPositions(firstObj,secondObj){
        let firstPos = firstObj.getPos();
        let secondPos = secondObj.getPos();
        firstObj.advance(this,secondPos);
        secondObj.advance(this,firstPos);
        return false;
    }


    updateScore(addToScore){
        this.score += addToScore;
    }
    
    setGhosts(){
        let ghostsLocs = Object.values(GHOST_START_LOC);
        for (let i=0; i < monstersCount; i++) {
            this.setGridCell(ghostsLocs[i],this.ghosts[i]);
        }
        this.setGridCell(GHOST_START_LOC.SPECIALGHOST,this.sGhost);
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
    gridCellEmpty(pos){
        return this.gameGrid[pos[0]][pos[1]] === BOARD_OBJECT_ID.BLANK;
    }
    setGridCell(pos,obj){
        this.gameGrid[pos[0]][pos[1]] = obj; 
    }
    getStartTime(){
        return this.startTime;
    }
    getScore(){
        return this.score;
    }

    


}