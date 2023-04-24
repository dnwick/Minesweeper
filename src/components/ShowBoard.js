import { useState, useEffect } from "react";
import GameBoardCellList from "./GameBoardCellList";

/**
 * Renders GameBoard With User provided Game Config.
 * @param {JSON} config Parent pros.
 * @returns {JSX} rendered Game Board view.
 */
function ShowBoard({config}) {

    const [gameBoardState, setGameBoardState] = useState({
        boardData: [],
        gameBombCount: 0, 
        gameStatus : 'Started'
    });

    useEffect(() => {
        let boardData = initializeBoard(config);
        const updatedGameBoardState = {
            ... gameBoardState,
            boardData : boardData,
            gameBombCount: config.bombs,
        }
        setGameBoardState(updatedGameBoardState);
    }, [config]);

    const handleClick = (xPosition, yPosition) => {
        let data = gameBoardState.boardData;
        data[yPosition][xPosition].isFlagged = false;
        data[yPosition][xPosition].isRevealed = true;
        const updatedGameBoardState = {
            ... gameBoardState,
            boardData : data
        }
        setGameBoardState(updatedGameBoardState);
    };
    
    return <div>
        <div className="game-title">This is the game board !</div>
        <div className="game-canvas">
           <div><GameBoardCellList onCellClick={handleClick} cellList={gameBoardState.boardData}/></div>
        </div>
    </div>;
}

function initializeBoard(config) {
    //Initialize an empty board according to width and height
    let board = createEmptyBoard(config.width, config.height);

    //Randomly assign bombs to the board
    plantBombs(board, config.width, config.height, config.bombs);

    //Find neighbouring bombs
    calculateNeighbouringBombs(board, config.width, config.height);
    return board;
}

function createEmptyBoard(width, height) {  
    let data = [];
    for (let i = 0; i < height; i++ ) {
        data.push([]);
        for (let j = 0; j < width; j++) {
            data[i][j] = {
                x : j,
                y : i,
                isHidden: true,
                isBomb: false,
                isFlagged: false,
                neighbourBombCount:0,
                isRevealed: false,
            };
        }
    }
    return data;
}


function generateRandomPosition(value) {
    return Math.floor((Math.random() * 1000) + 1) % value;
}

function plantBombs(emptyBoard, width, height, noOfbombs) {
    let randX, randY, plantedBombs = 0;
    while (plantedBombs < noOfbombs) {
        randX = generateRandomPosition(width);
        randY = generateRandomPosition(height);
        if (!emptyBoard[randY][randX].isBomb) {
            emptyBoard[randY][randX].isBomb = true;
            plantedBombs ++;
        }
    }
}

function calculateNeighbouringBombs(board, width, height) {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (!board[i][j].isBomb) {
                // this will return surrounding neighbours for a perticular cell if exist in the drawn board
                let neighbourList = getSurroundingNeighbours(board, board[i][j].x, board[i][j].y, width, height);
                let neighbouringBombsCount = 0;
                neighbourList.map(neighbour => {
                    if (neighbour.isBomb) {
                        neighbouringBombsCount++;
                    }
                });
                if (neighbouringBombsCount > 0) {
                    board[i][j].neighbourBombCount = neighbouringBombsCount;
                } 
            }
        }
    }
}

function getSurroundingNeighbours(board, xPosition, yPosition, width, height) {
    let neighbourList = [];

    // Get UP position neighbour
    if (yPosition < height - 1) {
        neighbourList.push(board[yPosition + 1][xPosition]);
    }

    // Get DOWN position neighbour
    if (yPosition > 0) {
        neighbourList.push(board[yPosition - 1][xPosition]);
    }

    // Get LEFT position neighbour
    if (xPosition > 0) {
        neighbourList.push(board[yPosition][xPosition - 1]);
    }

    // Get RIGHT position neighbour
    if (xPosition < width - 1) {
        neighbourList.push(board[yPosition][xPosition + 1]);
    }

    // Get UP LEFT position neighbour
    if (yPosition < height - 1 && xPosition > 0) {
        neighbourList.push(board[yPosition + 1][xPosition - 1]);
    }

    // Get UP RIGHT position neighbour
    if (yPosition < height - 1 && xPosition < width - 1) {
        neighbourList.push(board[yPosition + 1][xPosition + 1]);
    }

    // Get DOWN LEFT position neighbour
    if (yPosition > 0 && xPosition > 0) {
        neighbourList.push(board[yPosition - 1][xPosition - 1]);
    }

    // Get DOWN RIGHT position neighbour
    if (yPosition > 0 && xPosition < width - 1) {
        neighbourList.push(board[yPosition - 1][xPosition + 1]);
    }

    return neighbourList;
}

export default ShowBoard;