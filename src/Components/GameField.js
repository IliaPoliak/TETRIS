import { useState, useEffect, useRef } from "react";
import { placeTile, move, isMoveAllowed, turn } from "../utils";

const GameField = ({
  setGameState,
  lines,
  setLines,
  level,
  setLevel,
  setScore,
  nextTileIndex,
  setNextTileIndex,
}) => {
  // Logical representation of the game field (20x10 grid filled with numbers)
  // 0 - Empty
  // 1 - Falling Tile
  // 2 - Center of the Tile Falling (needed for turning)
  // 3 - Laying Tiles
  const [gameFieldState, setGameFieldState] = useState(() =>
    // Added 21st row (not visible) above. Tiles will appear there if there is no more place to appear
    Array(21)
      .fill(null)
      .map(() => Array(10).fill(0))
  );

  // Track if initial tile is placed (to prevent useEffect hook from running twice)
  const isTilePlaced = useRef(false);

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

  // Set interval to move tile down
  useEffect(() => {
    const interval = setInterval(() => {
      move(
        "D",
        gameFieldState,
        setGameFieldState,
        setGameState,
        level,
        setLines,
        setScore,
        nextTileIndex,
        setNextTileIndex
      );
      // The speed of the tile depends on level, starting with 0.8 seconds per pixel
    }, 800 - 35 * (level > 20 ? 20 : level));

    // Clean up
    return () => clearInterval(interval);
  }, [level, nextTileIndex]);

  // Game controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["7", "ArrowLeft"].includes(event.key)) {
        // Move left
        move(
          "L",
          gameFieldState,
          setGameFieldState,
          setGameState,
          level,
          setLines,
          setScore,
          nextTileIndex,
          setNextTileIndex
        );
      } else if (["9", "ArrowRight"].includes(event.key)) {
        // Move right
        move(
          "R",
          gameFieldState,
          setGameFieldState,
          setGameState,
          level,
          setLines,
          setScore,
          nextTileIndex,
          setNextTileIndex
        );
      } else if (["8", "ArrowUp"].includes(event.key)) {
        // Turn
        turn(gameFieldState, setGameFieldState);
      } else if (["4", "ArrowDown"].includes(event.key)) {
        // Speed up
        move(
          "D",
          gameFieldState,
          setGameFieldState,
          setGameState,
          level,
          setLines,
          setScore,
          nextTileIndex,
          setNextTileIndex
        );
        // Increment score every pixel that tile doesnt fall by gravity
        setScore((prev) => prev + 1);
      } else if (["5", " "].includes(event.key)) {
        // Drop
        while (isMoveAllowed(gameFieldState)) {
          move(
            "D",
            gameFieldState,
            setGameFieldState,
            setGameState,
            level,
            setLines,
            setScore,
            nextTileIndex,
            setNextTileIndex
          );
          // Increment score every pixel that tile doesnt fall by gravity
          setScore((prev) => prev + 1);
        }
        move(
          "D",
          gameFieldState,
          setGameFieldState,
          setGameState,
          level,
          setLines,
          setScore,
          nextTileIndex,
          setNextTileIndex
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [level, nextTileIndex]);

  // Calculate level every time lines number changes
  useEffect(() => {
    // Increment level every 10 lines
    setLevel(Number.parseInt(lines / 10));
  }, [lines]);

  // Place initial tile, so we have something to move
  useEffect(() => {
    if (isTilePlaced.current === false) {
      // Place initial tile
      let tileIndex = Math.floor(Math.random() * 7); // Random value from 0 to 6
      placeTile(tileIndex, gameFieldState, setGameFieldState, setGameState);

      // Set next tile index state
      let next = Math.floor(Math.random() * 7); // Random value from 0 to 6
      setNextTileIndex(next);

      // Mark as placed
      isTilePlaced.current = true;
    }
  }, []);

  return <pre>{gameField}</pre>;
};

export default GameField;
