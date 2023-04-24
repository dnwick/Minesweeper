/**
 * Renders Game board.
 * @param {EVENT} onClick Event to handle user left click on each game board cell.
 * @param {JSON} cell JSON object with all details regards to a cell.
 * @returns {JSX} one single game board cell withh all handlers attached.
 */
function GameBoardCell({onClick, cell}) {
    return (
        <div onClick={onClick} className="cell">
           This is a Cell
        </div>
    );
}

export default GameBoardCell;