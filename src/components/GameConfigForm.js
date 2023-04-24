import { useState } from "react";

/**
 * Renders Configuration Form.
 * @param {EVENT} onGameConfigAdd Event to handle user submits the form with game configuration.
 * @returns {JSX} configuration form with relevant config details for the game.
 */
function GameConfigForm({ onGameConfigAdd }) {
    const [gameButtonDisplayName, setGameButtonDisplayName] = useState(
        JSON.parse(localStorage.getItem('gameButtonDisplayName')) || 'Start Game'
    );
    const [playerName, setPlayerName] = useState(
        JSON.parse(localStorage.getItem('playerName')) || ''
    );
    const [width, setWidth] = useState(
        JSON.parse(localStorage.getItem('width')) || ''
    );
    const [height, setHeight] = useState(
        JSON.parse(localStorage.getItem('height')) || ''
    );
    const [bombs, setbombs] = useState(
        JSON.parse(localStorage.getItem('bombs')) || ''
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("HandleSubmit " + playerName)
        onGameConfigAdd({playerName, width, height, bombs});
        localStorage.setItem('gameButtonDisplayName', JSON.stringify('Restart Game'));
        setGameButtonDisplayName('Restart Game');
    };

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="playerName">Player Name</label>
            <input id="playerName" value={playerName} onChange={
                (e) => {
                    setPlayerName(e.target.value);
                    localStorage.setItem('playerName', JSON.stringify(e.target.value));
                }} required></input>
        </div>
        <div>
            <label htmlFor="width">Width</label>
            <input id="width" value={width} onChange={
                (e) => {
                    setWidth(e.target.value);
                    localStorage.setItem('width', JSON.stringify(e.target.value));
                }} required></input>
        </div>
        <div>
            <label htmlFor="height">Height</label>
            <input id="height" value={height} onChange={
                (e) => {
                    setHeight(e.target.value);
                    localStorage.setItem('height', JSON.stringify(e.target.value));
                }} required></input>
        </div>
        <div>
            <label htmlFor="bombs">Number of Bombs</label>
            <input id="bombs" value={bombs} onChange={
                (e) => {
                    setbombs(e.target.value);
                    localStorage.setItem('bombs', JSON.stringify(e.target.value));
                }} required></input>
        </div>
        <button>{gameButtonDisplayName}</button>
    </form>

}

export default GameConfigForm;