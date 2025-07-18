import { useState, useEffect } from "react";
import { move, isMoveAllowed, turn } from "../utils";

const GameField = () => {
  // Logical representation of the game field
  // 0 - Empty
  // 1 - Falling Tile
  // 2 - Center of the Tile Falling (needed for turning)
  // 3 - Laying Tiles
  const [gameFieldState, setGameFieldState] = useState([
    [0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  // Visual representation of game field
  let gameField = "";
  for (let row = 0; row < 20; row++) {
    gameField += "<!";
    for (let col = 0; col < 10; col++) {
      gameField += gameFieldState[row][col] === 0 ? " ." : "[]";
    }
    gameField += "!>\n";
  }
  gameField +=
    "<!====================!>\n" + "  \\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\n";

  // Set interval to move tile down every half second
  useEffect(() => {
    const interval = setInterval(() => {
      move("D", gameFieldState, setGameFieldState);
    }, 500);

    // Clean up
    return () => clearInterval(interval);
  }, []);

  // Game controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["7", "ArrowLeft"].includes(event.key)) {
        // move left
        move("L", gameFieldState, setGameFieldState);
      } else if (["9", "ArrowRight"].includes(event.key)) {
        // move right
        move("R", gameFieldState, setGameFieldState);
      } else if (["8", "ArrowUp"].includes(event.key)) {
        // turn
        turn(gameFieldState, setGameFieldState);
      } else if (["4", "ArrowDown"].includes(event.key)) {
        // move faster
        move("D", gameFieldState, setGameFieldState);
        move("D", gameFieldState, setGameFieldState);
        move("D", gameFieldState, setGameFieldState);
      } else if (["5", " "].includes(event.key)) {
        // drop
        while (isMoveAllowed(gameFieldState)) {
          move("D", gameFieldState, setGameFieldState);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <pre>{gameField}</pre>;
};

export default GameField;
