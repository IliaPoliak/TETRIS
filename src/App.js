import { useEffect, useState } from "react";
import Intro from "./Components/Intro.js";
import Game from "./Components/Game.js";
import GameOver from "./Components/GameOver.js";

const App = () => {
  // "intro" | "game" | "pause" | "gameover"
  const [gameState, setGameState] = useState("intro");

  const [lines, setLines] = useState(0);

  // Increment level every 10 lines
  // Levels up to 20th increase the speed in witch tiles are falling
  const [level, setLevel] = useState(0);

  // Increment score every pixel the tile drops by "Speed Up" or "Drop"
  // Increment score when the tile toutches the ground by "level * 3"
  // TODO: Increment score when the tile toutches the ground by 5 if next tile preview is off
  const [score, setScore] = useState(0);

  // Restart the stats in between the games
  useEffect(() => {
    if (gameState === "intro") {
      setLines(0);
      setLevel(0);
      setScore(0);
    }
  }, [gameState]);

  return (
    <div className="min-h-screen">
      {gameState === "intro" && <Intro setGameState={setGameState} />}

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
