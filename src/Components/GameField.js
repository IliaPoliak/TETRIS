import { useState, useEffect } from "react";
import { placeTile, move, isMoveAllowed, turn } from "../utils";

const GameField = () => {
  // Logical representation of the game field (20x10 grid filled with numbers)
  // 0 - Empty
  // 1 - Falling Tile
  // 2 - Center of the Tile Falling (needed for turning)
  // 3 - Laying Tiles
  const [gameFieldState, setGameFieldState] = useState(() =>
    Array(20)
      .fill(null)
      .map(() => Array(10).fill(0))
  );

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
      move("D", setGameFieldState);
    }, 500);

    // Clean up
    return () => clearInterval(interval);
  }, []);

  // Game controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["7", "ArrowLeft"].includes(event.key)) {
        // move left
        move("L", setGameFieldState);
      } else if (["9", "ArrowRight"].includes(event.key)) {
        // move right
        move("R", setGameFieldState);
      } else if (["8", "ArrowUp"].includes(event.key)) {
        // turn
        turn(gameFieldState, setGameFieldState);
      } else if (["4", "ArrowDown"].includes(event.key)) {
        // move faster
        move("D", setGameFieldState);
        move("D", setGameFieldState);
        move("D", setGameFieldState);
      } else if (["5", " "].includes(event.key)) {
        // drop
        let c = 0;
        while (isMoveAllowed(gameFieldState)) {
          //console.log(gameFieldState);
          //console.log(isMoveAllowed(gameFieldState));
          move("D", setGameFieldState);
          c++;
          if (c === 30) {
            break;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Place initial tile, so we have something to move
  useEffect(() => {
    let tileIndex = Math.floor(Math.random() * 7); // random value from 0 to 6
    setGameFieldState((prevState) => {
      return placeTile(tileIndex, prevState);
    });
  }, []);

  return <pre>{gameField}</pre>;
};

export default GameField;
