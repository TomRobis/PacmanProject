class gameBoard {
    constructor(){

        this.score = 0;
        this.gameGrid = generateNewGrid();
        this.dotsEaten = 0;


        this.ghosts =
        [    
            new ghost(GHOST_START_LOC.BLINKY,OBJECT_COLORS.BLINKY),
            new ghost(GHOST_START_LOC.PINKY,OBJECT_COLORS.PINKY),
            new ghost(GHOST_START_LOC.INKY,OBJECT_COLORS.INKY),
            new ghost(GHOST_START_LOC.CLYDE,OBJECT_COLORS.CLYDE)
        ];
        this.sGhost = new specialGhost(GHOST_START_LOC.SPECIALGHOST,OBJECT_COLORS.SPECIALGHOST);
        this.pacman = new pacman(this.getPacmanStartPos());


        this.placeDotsOnGameBoard();

        
    }

    getPacmanStartPos(){
        let pacmanLoc = this.findRandomEmptyCell();
        this.setGridCell(pacmanLoc,BOARD_OBJECT_ID.PACMAN)
        return pacmanLoc;
    }


    /**
     *
     * places dot identifiers on the gameboard randomly, based on pre-determined probabilities.
     * @memberof gameBoard
     */
    placeDotsOnGameBoard(){
        let randomNum;
        let emptyCell;

        let foodRemain = numOfDots;
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
        while (!this.gridCellEmpty(randCell)) {
            randCell = this.generateRandomLocation();
        }
        return randCell;
    }

    generateRandomLocation(){
        return [getRndValue(1,rowCount-2),getRndValue(1,colCount-2)];
    }

    // after placing dots identifiers, objects are initiated based on identifiers. 
    initGameBoard(){
        let gridPos;
        let dotColor;
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
        this.setTimeDot();
        this.setKillDot();
    }

    // each object in the grid is called to draw itself on its designated grid cell 
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

    setTimeDot()
    {
        let pos=this.findRandomEmptyCell();
        let timedot= new timeDot(pos,0,"red");
        this.setGridCell(pos,timedot);
    }

    setKillDot()
    {
        let pos=this.findRandomEmptyCell();
        let killdot= new killDot(pos,0,"red");
        this.setGridCell(pos,killdot);
    }


    /**
     * each drawable object can interact with movables - pacman and ghost objects. 
     *  once a collision is made with either, a method is invoked to deal with the collision
     * @param {movable} caller: the initiating party, tried to move and asks game board whether a collision has been made.  
     * @param {[int: col,int: row]} nextPos: the position caller wanted to move to.  
     * @return {boolean} collision indicator 
     * @memberof gameBoard
     */
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



    /**
     *
     *
     * @param {int} addToScore: score to add to total score of player
     * @param {boolean} isRegularDot: indicator - eating all the regular dots ends the game, special dots are not counted. 
     * @memberof gameBoard
     */
    updateScore(addToScore,isRegularDot){
        this.score += addToScore;
        if (isRegularDot){
            this.dotsEaten +=1;
        }
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
    setNewPacman(){
        let prevPos = this.pacman.getPos();
        let newPac = new pacman(this.findRandomEmptyCell());
        let nextPos = newPac.getPos();
        
        
        this.setGridCell(prevPos,BOARD_OBJECT_ID.BLANK);
        delete this.pacman;
        this.pacman = newPac;
        pacmanInstance = newPac;
        this.setGridCell(nextPos,newPac);

    }
    getEatenDots(){
        return this.dotsEaten;
    }

    


}