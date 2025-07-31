import { useEffect, useState } from "react";
import Intro from "./Components/Intro.js";
import Menu from "./Components/Menu.js";
import Game from "./Components/Game.js";
import GameOver from "./Components/GameOver.js";

const App = () => {
  // "intro" | "game" | "gameover" | "menu"
  const [gameState, setGameState] = useState("intro");

  // Count how many lines are cleared in the game
  const [lines, setLines] = useState(0);

  // Increment level every 10 lines
  // Levels up to 20th increase the speed in witch tiles are falling
  // Scores are multiplied by the level
  const [level, setLevel] = useState(1);

  // Soft Drop - 1 x Distance
  // Hard Drop - 2 x Distance
  // Single Line Clear - 100
  // Double Line Clear - 300
  // Triple Line Clear - 500
  // Scores are multiplied by the level
  const [score, setScore] = useState(0);

  // Restart the stats in between the games
  useEffect(() => {
    if (gameState === "intro") {
      setLines(0);
      setLevel(1);
      setScore(0);
    }
  }, [gameState]);

  return (
    <div className="min-h-screen">
      {gameState === "intro" && <Intro setGameState={setGameState} />}

      {gameState === "menu" && <Menu setGameState={setGameState} />}

      {gameState === "game" && (
        <Game
          setGameState={setGameState}
          lines={lines}
          setLines={setLines}
          level={level}
          setLevel={setLevel}
          score={score}
          setScore={setScore}
        />
      )}

      {gameState === "gameover" && (
        <GameOver
          setGameState={setGameState}
          lines={lines}
          level={level}
          score={score}
        />
      )}
    </div>
  );
};

export default App;
