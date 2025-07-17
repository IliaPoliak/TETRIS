import { useState } from "react";
import Intro from "./Components/Intro.js";
import Game from "./Components/Game.js";
import Pause from "./Components/Pause.js";
import GameOver from "./Components/GameOver.js";

const App = () => {
  // "intro" | "game" | "pause" | "gameover"
  const [gameState, setGameState] = useState("intro");

  return (
    <div className="min-h-screen">
      {gameState === "intro" && <Intro setGameState={setGameState} />}

      {gameState === "game" && <Game />}

      {gameState === "pause" && <Pause />}

      {gameState === "gameover" && <GameOver />}
    </div>
  );
};

export default App;
