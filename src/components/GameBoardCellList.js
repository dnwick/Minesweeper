import GameBoardCell from "./GameBoardCell";

/**
 * Renders Game board.
 * @param {EVENT} onCellClick Event to handle user left click on each game board cell.
 * @param {JSON} cellList All game board cells as a JSON 2d array.
 * @returns {JSX} game board with all relevant handles attached to each board cell.
 */
function GameBoardCellList({ onCellClick, cellList }) {
    console.log("In GameBoardCellList");

    const renderedCells = cellList.map((cellRow) => {
        return cellRow.map((cellColumn) => {
            return (
                <div key={`${cellColumn.x}_${cellColumn.y}`}>
                    <GameBoardCell onClick={() => onCellClick(cellColumn.x, cellColumn.y)} cell={cellColumn} />
                </div>);
        })
    });

    return <div className="cells">{renderedCells}</div>
}

export default GameBoardCellList;