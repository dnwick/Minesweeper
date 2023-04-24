import { useState } from "react";
import GameConfigForm from "./components/GameConfigForm";
import ShowBoard from "./components/ShowBoard";

/**
 * Renders Game With provided game configuration form.
 * @returns {JSX} rendered Game view with configuration form and actual game.
 */
function App() {
    //State to handle game configuration
    const [gameConfig, setGameConfig] = useState(
        JSON.parse(localStorage.getItem('gameConfig')) || {});

    const onGameConfigAdd = (config) => {
        let tempConfig = {
            playerName: config.playerName, 
            width: parseInt(config.width) || 0,
            height: parseInt(config.height) || 0,
            bombs: parseInt(config.bombs) || 0
          };
        localStorage.setItem('gameConfig', JSON.stringify(tempConfig));
        setGameConfig(tempConfig);
    }
    
    return (
        <div>
            <div>
                Minesweeper
            </div>
            <div>
                <GameConfigForm onGameConfigAdd={onGameConfigAdd}/>
            </div>
            <div>
                <ShowBoard config={gameConfig}/>
            </div>
        </div>  
    );
}

export default App;