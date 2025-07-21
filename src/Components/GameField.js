import { useState, useEffect, useRef } from "react";
import { placeTile, move, isMoveAllowed, turn } from "../utils";

const GameField = ({ setGameState, setLines, setLevel, setScore }) => {
  // Logical representation of the game field (20x10 grid filled with numbers)
  // 0 - Empty
  // 1 - Falling Tile
  // 2 - Center of the Tile Falling (needed for turning)
  // 3 - Laying Tiles
  const [gameFieldState, setGameFieldState] = useState(() =>
    Array(21)
      .fill(null)
      .map(() => Array(10).fill(0))
  );

  const isTilePlaced = useRef(false); // Track if initial tile is placed (to prevent useEffect hook to run twice)

  // Visual representation of game field
  let gameField = "";
  for (let row = 1; row < 21; row++) {
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
      move("D", gameFieldState, setGameFieldState, setGameState, setLines);
    }, 500);

    // Clean up
    return () => clearInterval(interval);
  }, []);

  // Game controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["7", "ArrowLeft"].includes(event.key)) {
        // move left
        move("L", gameFieldState, setGameFieldState, setGameState, setLines);
      } else if (["9", "ArrowRight"].includes(event.key)) {
        // move right
        move("R", gameFieldState, setGameFieldState, setGameState, setLines);
      } else if (["8", "ArrowUp"].includes(event.key)) {
        // turn
        turn(gameFieldState, setGameFieldState);
      } else if (["4", "ArrowDown"].includes(event.key)) {
        // move faster
        move("D", gameFieldState, setGameFieldState, setGameState, setLines);
        move("D", gameFieldState, setGameFieldState, setGameState, setLines);
        move("D", gameFieldState, setGameFieldState, setGameState, setLines);
      } else if (["5", " "].includes(event.key)) {
        // drop
        while (isMoveAllowed(gameFieldState)) {
          move("D", gameFieldState, setGameFieldState, setGameState);
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
    if (!isTilePlaced.current) {
      let tileIndex = Math.floor(Math.random() * 7); // random value from 0 to 6
      placeTile(tileIndex, gameFieldState, setGameFieldState, setGameState);
      isTilePlaced.current = true; // Mark as placed
    }
  }, []);

  return <pre>{gameField}</pre>;
};

export default GameField;
